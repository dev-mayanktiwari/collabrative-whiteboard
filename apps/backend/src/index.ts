import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { AppConfig } from "./config";
import {} from "@repo/shared-utils";

const app: Application = express();
const PORT = AppConfig.get("PORT");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// app.use("/api/v1/health", healthRouter);
// app.use("/api/v1/auth", authRouter);

app.use((req: Request, _: Response, next: NextFunction) => {
  try {
    throw new Error("Not Found");
  } catch (error) {
    httpError;
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
