import healthController from "@/controllers/healthController";
import { Router } from "express";

const healthRouter: Router = Router();

healthRouter.get("/", healthController.health);
healthRouter.get("/self", healthController.self);

export default healthRouter;
