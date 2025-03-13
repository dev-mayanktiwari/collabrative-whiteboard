import { JWTManager } from "@repo/jwt";
import { httpError } from "@repo/shared-utils";
import {
  AuthenticatedRequest,
  ResponseMessage,
  StatusCodes,
} from "@repo/types";
import { Request, Response, NextFunction } from "express";

const AuthMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return httpError(
        next,
        new Error(ResponseMessage.TOKEN_ERROR),
        req,
        StatusCodes.ERROR.CLIENT_ERROR.UNAUTHORIZED
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return httpError(
        next,
        new Error("Token is required"),
        req,
        StatusCodes.ERROR.CLIENT_ERROR.UNAUTHORIZED
      );
    }

    const payload = JWTManager.verifyAccessToken(token);

    (req as AuthenticatedRequest).user = payload;

    next();
  } catch (error) {
    return httpError(
      next,
      new Error("Unauthorized: Invalid or expired token"),
      req,
      StatusCodes.ERROR.CLIENT_ERROR.UNAUTHORIZED
    );
  }
};

export default AuthMiddleware;
