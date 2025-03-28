import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  asyncErrorHandler,
  httpError,
  httpResponse,
  logger,
} from "@repo/shared-utils";
import {
  ApplicationEnvirontment,
  AuthenticatedRequest,
  ResponseMessage,
  StatusCodes,
  TokenPayload,
  UserLoginInput,
  UserRegisterInput,
  ForgotUserInput,
  ResetSetNewPasswordInput,
  ChangePasswordSchema,
  TVerifyEmailInput,
} from "@repo/types";
import userDbServices from "@/services/userDbServices";
import { AppConfig } from "@/config";
import quicker from "@/utils/quicker";
import sendEmail from "@/utils/sendEmail";
import { JWTManager } from "@repo/jwt";

export default {
  register: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { body } = req;

      const safeParse = UserRegisterInput.safeParse(body);
      if (!safeParse.success) {
        return httpError(
          next,
          new Error(ResponseMessage.INVALID_INPUT),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }

      const { email, name, password, username } = safeParse.data;
      const existingUser = await userDbServices.findUserByEmailOrUsername(
        email,
        username
      );
      if (existingUser) {
        return httpError(
          next,
          new Error(ResponseMessage.ENTITY_EXIST),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }

      const hashedPassword = await bcrypt.hash(
        password,
        Number(AppConfig.get("SALT_ROUNDS"))
      );

      const verificationToken = quicker.generateVerifyToken(1, "day");
      const code = quicker.generateCode(6);

      const newUser = await userDbServices.createUser(
        name,
        email,
        username,
        hashedPassword,
        verificationToken.token,
        String(code),
        verificationToken.expiry
      );

      const resultVerificationEmail = await sendEmail.sendVerificationEmail(
        email,
        name,
        verificationToken.token,
        String(code)
      );

      // const resultWelcomeEmail = await sendEmail.sendWelcomeEmail(email, name);

      if (!resultVerificationEmail.success) {
        logger.warn("Account verification email sending failed", {
          meta: {
            to: email,
            name,
            error: resultVerificationEmail.info,
          },
        });
      }

      // if (!resultWelcomeEmail.success) {
      //   logger.warn("Welcome email sending failed", {
      //     meta: {
      //       to: email,
      //       name,
      //       error: resultWelcomeEmail.info,
      //     },
      //   });
      // }

      logger.info(
        "User created successfully and verification and welcome email sent.",
        {
          meta: {
            email,
            name,
            username,
            verificationEmailData: resultVerificationEmail.info,
          },
        }
      );

      return httpResponse(
        req,
        res,
        StatusCodes.SUCCESS.CREATED,
        ResponseMessage.USER_CREATED,
        {
          user: newUser,
          tokenDetails: verificationToken,
        }
      );
    }
  ),

  verifyEmail: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { token, code } = req.query as TVerifyEmailInput;
      if (!token || !code) {
        return httpError(
          next,
          new Error(ResponseMessage.INVALID_INPUT),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }

      const user = await userDbServices.findUserByVerificationToken(
        String(token),
        String(code)
      );

      if (!user) {
        return httpError(
          next,
          new Error(ResponseMessage.NOT_FOUND),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }

      if (user.isVerified) {
        return httpResponse(
          req,
          res,
          StatusCodes.SUCCESS.OK,
          "Account already verified."
        );
      }

      await userDbServices.verifyUser(user.userId);
      await sendEmail.sendWelcomeEmail(user.email, user.name);

      return httpResponse(
        req,
        res,
        StatusCodes.SUCCESS.OK,
        "Account verified successfully."
      );
    }
  ),

  login: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { body } = req;
      const safeParse = UserLoginInput.safeParse(body);
      if (!safeParse.success) {
        return httpError(
          next,
          new Error(ResponseMessage.INVALID_INPUT),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }

      const { identifier, password } = safeParse.data;

      const user = await userDbServices.findUserByEmailOrUsername(
        identifier,
        identifier
      );

      if (!user || !user.isActive) {
        return httpError(
          next,
          new Error(ResponseMessage.LOGIN_UNSUCCESSFUL),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.FORBIDDEN
        );
      }

      if (!user?.isVerified) {
        return httpError(
          next,
          new Error("Please verify your email to login."),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.FORBIDDEN
        );
      }

      const isPasswordCorrect = await bcrypt.compare(password, user?.password!);

      if (!isPasswordCorrect) {
        return httpError(
          next,
          new Error(ResponseMessage.LOGIN_UNSUCCESSFUL),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.UNAUTHORIZED
        );
      }

      const payload: TokenPayload = {
        name: user.name,
        userId: user.userId,
        email: user.email,
      };

      const { accessToken, refreshToken } =
        JWTManager.generateTokenPair(payload);

      await userDbServices.updateRefreshToken(user.userId, refreshToken);

      res.cookie("refreshToken", refreshToken, {
        path: "/api/v1",
        domain: String(AppConfig.get("COOKIE_DOMAIN")),
        httpOnly: true,
        secure: AppConfig.get("ENV") === "production",
        sameSite: "lax",
        maxAge: 15 * 24 * 60 * 60 * 1000,
      });

      const responseUser = {
        userId: user.userId,
        name: user.name,
        email: user.email,
        username: user.username,
      };

      return httpResponse(
        req,
        res,
        StatusCodes.SUCCESS.OK,
        ResponseMessage.LOGIN_SUCCESS,
        {
          user: responseUser,
          accessToken: `Bearer ${accessToken}`,
        }
      );
    }
  ),

  forgotPassword: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { body } = req;
      const safeParse = ForgotUserInput.safeParse(body);

      if (!safeParse.success) {
        // const formatted = safeParse.error.format();
        return httpError(
          next,
          new Error(ResponseMessage.INVALID_INPUT),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }

      const user = await userDbServices.findUserByEmailOrUsername(
        safeParse.data.email,
        safeParse.data.email
      );

      if (!user) {
        return httpError(
          next,
          new Error(ResponseMessage.NOT_FOUND),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.NOT_FOUND
        );
      }

      //  const expiryTime = await quicker.generateExpiryTime(15);
      const token = quicker.generateVerifyToken(15, "minute");
      await userDbServices.addResetToken(
        user?.userId!,
        token.token,
        token.expiry
      );

      await sendEmail.sendPasswordResetLinkEmail(
        user.email,
        user.name,
        token.token
      );

      return httpResponse(
        req,
        res,
        StatusCodes.SUCCESS.OK,
        "Reset link sent to your email"
      );
    }
  ),

  resetPassword: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { body } = req;
      const { token } = req.query;

      const safeParse = ResetSetNewPasswordInput.safeParse(body);

      if (!safeParse.success) {
        return httpError(
          next,
          new Error(ResponseMessage.INVALID_INPUT),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }

      const tokenData = await userDbServices.findUserByResetToken(
        token as string
      );

      if (!tokenData) {
        return httpError(
          next,
          new Error(ResponseMessage.NOT_FOUND),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.NOT_FOUND
        );
      }

      const user = await userDbServices.findUserById(tokenData.userId);

      if (!user?.isVerified || !user?.isActive) {
        return httpError(
          next,
          new Error("User not verified or account deactivated"),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.FORBIDDEN
        );
      }

      const diff = quicker.calculateTimeDifference(tokenData.expiresAt);

      if (diff > 15) {
        return httpError(
          next,
          new Error("Reset link expired"),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.UNAUTHORIZED
        );
      }

      const currentPassword = user.password;
      const arepasswordSame = await bcrypt.compare(
        safeParse.data.newPassword,
        currentPassword!
      );

      if (arepasswordSame) {
        return httpError(
          next,
          new Error("New password cannot be same as previous password"),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }

      const hashedPassword = await bcrypt.hash(
        safeParse.data.newPassword,
        Number(AppConfig.get("SALT_ROUNDS"))
      );

      await userDbServices.updatePassword(user.userId, hashedPassword);
      await userDbServices.clearResetToken(user.userId);

      await sendEmail.sendPasswordChangeSuccessEmail(user.email!, user.name!);

      return httpResponse(
        req,
        res,
        StatusCodes.SUCCESS.OK,
        "Password reset successfully"
      );
    }
  ),

  changePassword: asyncErrorHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { body, user } = req as AuthenticatedRequest;

      const safeParse = ChangePasswordSchema.safeParse(body);
      if (!safeParse) {
        return httpError(
          next,
          new Error(ResponseMessage.INVALID_INPUT),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }

      const dbUser = await userDbServices.findUserById(user?.userId!);
      if (!dbUser) {
        return httpError(
          next,
          new Error(ResponseMessage.NOT_FOUND),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.NOT_FOUND
        );
      }

      const isPasswordCorrect = await bcrypt.compare(
        safeParse.data?.currentPassword!,
        dbUser.password!
      );

      if (!isPasswordCorrect) {
        return httpError(
          next,
          new Error("Current password is incorrect"),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.FORBIDDEN
        );
      }

      const arepasswordSame = await bcrypt.compare(
        safeParse.data?.newPassword!,
        dbUser.password!
      );

      if (arepasswordSame) {
        return httpError(
          next,
          new Error("New password cannot be same as previous password"),
          req,
          StatusCodes.ERROR.CLIENT_ERROR.BAD_REQUEST
        );
      }

      const hashedPassword = await bcrypt.hash(
        safeParse.data?.newPassword!,
        Number(AppConfig.get("SALT_ROUNDS"))
      );

      await userDbServices.updatePassword(user?.userId!, hashedPassword);

      return httpResponse(
        req,
        res,
        StatusCodes.SUCCESS.OK,
        "Password changed successfully"
      );
    }
  ),

  logout: asyncErrorHandler(async (req: Request, res: Response) => {
    const { cookies } = req as AuthenticatedRequest;
    const { refreshToken } = cookies as { refreshToken: string | undefined };

    const clearAuthCookies = () => {
      const cookieOptions = {
        path: "/api/v1",
        domain: String(AppConfig.get("COOKIE_DOMAIN")),
        sameSite: "lax" as const,
        httpOnly: true,
        secure: AppConfig.get("ENV") === ApplicationEnvirontment.PRODUCTION,
      };
  
      res.clearCookie("refreshToken", cookieOptions);
    };

    const payload = JWTManager.verifyRefreshToken(refreshToken!);

    if (!payload) {
      clearAuthCookies();
      return httpResponse(
        req,
        res,
        StatusCodes.SUCCESS.OK,
        ResponseMessage.LOGOUT_SUCCESS
      );
    }

    if (refreshToken) {
      await userDbServices.updateRefreshToken(payload.userId!, null);
    }

    clearAuthCookies();

    return httpResponse(
      req,
      res,
      StatusCodes.SUCCESS.OK,
      ResponseMessage.LOGOUT_SUCCESS
    );
  }),

  refreshToken: asyncErrorHandler(async (req: Request, res: Response) => {
    const { cookies } = req;
    const { refreshToken } = cookies as { refreshToken: string | undefined };
    console.log("Refresh token", refreshToken);
    if (!refreshToken) {
      return httpResponse(
        req,
        res,
        StatusCodes.ERROR.CLIENT_ERROR.UNAUTHORIZED,
        ResponseMessage.UNAUTHORIZED
      );
    }

    const payload = JWTManager.verifyRefreshToken(refreshToken);
    console.log("Payload", payload);

    if (!payload) {
      return httpResponse(
        req,
        res,
        StatusCodes.ERROR.CLIENT_ERROR.UNAUTHORIZED,
        ResponseMessage.UNAUTHORIZED
      );
    }

    const user = await userDbServices.findUserById(payload.userId);
    console.log("User", user);
    if (!user) {
      return httpResponse(
        req,
        res,
        StatusCodes.ERROR.CLIENT_ERROR.UNAUTHORIZED,
        ResponseMessage.UNAUTHORIZED
      );
    }

    const accessToken = JWTManager.generateAccessToken({
      userId: user.userId,
      email: user.email,
      name: user.name,
    });
    console.log("Access token", accessToken);
    const responseUser = {
      name: user.name,
      id: user.userId,
      email: user.email,
      username: user.username,
    };

    return httpResponse(
      req,
      res,
      StatusCodes.SUCCESS.OK,
      "Token refreshed successfully",
      {
        accessToken: `Bearer ${accessToken}`,
        user: responseUser,
      }
    );
  }),

  self: asyncErrorHandler(async (req: Request, res: Response) => {
    const { user } = req as AuthenticatedRequest;
    const dbUser = await userDbServices.findUserById(user?.userId!);

    const responseUser = {
      userId: dbUser?.userId,
      name: dbUser?.name,
      email: dbUser?.email,
      username: dbUser?.username,
      avatar: dbUser?.avatar,
    };

    return httpResponse(req, res, StatusCodes.SUCCESS.OK, "User data", {
      user: responseUser,
    });
  }),

  authStatus: asyncErrorHandler(async (req: Request, res: Response) => {
    return httpResponse(
      req,
      res,
      StatusCodes.SUCCESS.OK,
      "User authenticated successfully",
      {
        isAuthenticated: true,
      }
    );
  }),
};
