import authController from "@/controllers/authController";
import AuthMiddleware from "@/middlewares/authentication";
import { Router } from "express";

const authRouter: Router = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.put("/logout", authController.logout);
authRouter.put("/refresh-token", authController.refreshToken);
authRouter.put("/forgot-password", authController.forgotPassword);
authRouter.put("/reset-password", authController.resetPassword);
authRouter.put("/verify-email", authController.verifyEmail);
authRouter.get("/self", AuthMiddleware, authController.self);
authRouter.put(
  "/change-password",
  AuthMiddleware,
  authController.changePassword
);
authRouter.get("/auth-status", AuthMiddleware, authController.authStatus);

export default authRouter;
