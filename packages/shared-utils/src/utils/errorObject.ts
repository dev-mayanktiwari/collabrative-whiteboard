import { Request } from "express";
import { THTTPError } from "@repo/types";
import { ResponseMessage } from "@repo/types";
import { logger, getEnv } from "./logger";

const errorObject = (
  error: Error | unknown,
  req: Request,
  errorStatusCode: number = 500
): THTTPError => {
  const errorObject: THTTPError = {
    success: false,
    statusCode: errorStatusCode,
    request: {
      method: req.method,
      ip: req.ip,
      url: req.originalUrl,
    },
    message:
      error instanceof Error
        ? error.message || ResponseMessage.INTERNAL_SERVER_ERROR
        : ResponseMessage.INTERNAL_SERVER_ERROR,
    data: null,
    trace: error instanceof Error ? { error: error.stack } : null,
  };

  logger.error(`Controller Error`, {
    meta: errorObject,
  });

  // Production ENV check - use the current env value from the logger config
  if (getEnv() === "production") {
    delete errorObject.request.ip;
    delete errorObject.trace;
  }

  return errorObject;
};

export { errorObject };
