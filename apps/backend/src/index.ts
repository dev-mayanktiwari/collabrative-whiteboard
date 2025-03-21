import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppConfig } from "./config";
import { httpError, configureLogger, logger } from "@repo/shared-utils";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import healthRouter from "./routers/healthRouter";
import authRouter from "./routers/authRouter";
import roomRouter from "./routers/roomRouter";
import AuthMiddleware from "./middlewares/authentication";

const app: Application = express();
const PORT = AppConfig.get("PORT");

app.use(
  cors({
    origin: String(AppConfig.get("CORS_ORIGIN")),
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

configureLogger({
  env: String(AppConfig.get("ENV")),
});

app.use("/api/v1/health", healthRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/rooms", AuthMiddleware, roomRouter);

app.use((req: Request, _: Response, next: NextFunction) => {
  try {
    throw new Error("Not Found");
  } catch (error) {
    httpError(next, error, req, 404);
  }
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  logger.info("Server started successfully.", {
    meta: {
      PORT: PORT,
      SERVER_URL: `http://localhost:${PORT}`,
    },
  });
});
