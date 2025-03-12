import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { asyncErrorHandler, httpError, httpResponse } from "@repo/shared-utils";
import { ResponseMessage, StatusCodes, UserRegisterInput } from "@repo/types";
import userDbServices from "@/services/userDbServices";
import { AppConfig } from "@/config";
import quicker from "@/utils/quicker";
import SendEmail from "@/utils/sendEmail";

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

      await SendEmail(email, name);

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
};
