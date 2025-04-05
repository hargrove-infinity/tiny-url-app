import { NextFunction, Request, Response } from "express";

import "express-async-errors";

import { ENV, HttpStatusCodes, NodeEnvs } from "@src/common";
import { pinoLogger } from "@src/logger";
import { ErrorHandler } from "@src/util";

export function handleCatchGlobalError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (ENV.NodeEnv !== NodeEnvs.Test.valueOf()) {
    pinoLogger.error(err);
  }

  const errorMessage =
    err.message && typeof err.message === "string"
      ? err.message
      : JSON.stringify(err.message);

  res
    .status(HttpStatusCodes.INTERNAL_SERVER_ERROR)
    .send({ errors: ErrorHandler.Common.unhandledError(errorMessage) });
}
