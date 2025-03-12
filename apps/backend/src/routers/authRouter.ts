import authController from "@/controllers/authController";
import { Router } from "express";

const authRouter: Router = Router();

authRouter.post("/register", authController.register);

export default authRouter;
