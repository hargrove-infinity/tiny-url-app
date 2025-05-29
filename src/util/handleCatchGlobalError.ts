import { NextFunction, Request, Response } from "express";

import "express-async-errors";

import { ENV, HttpStatusCodes, NodeEnvs } from "@src/common";
import { pinoLogger } from "@src/logger";
import { ClientErrorService } from "./ClientErrorService";

export function handleCatchGlobalError(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (ENV.NodeEnv !== NodeEnvs.Test.valueOf()) {
    pinoLogger.error(err);
  }

  const errorMessage =
    err.message && typeof err.message === "string"
      ? err.message
      : JSON.stringify(err.message);

  res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
    errors: ClientErrorService.Common.internalServerError(errorMessage),
  });
}
