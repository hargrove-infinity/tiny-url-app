import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";

import "express-async-errors";

import { BaseRouter } from "@src/routes";

import { ENV, NodeEnvs, Paths } from "@src/common";
import { pinoLogger, pinoLoggerHttp } from "@src/logger";
import { handleCatchAllRouteError } from "@src/util";

/******************************************************************************
                                Setup
******************************************************************************/

const app = express();

// **** Middleware **** //

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger middleware
app.use(pinoLoggerHttp);

// Security
if (ENV.NodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use(BaseRouter);

app.all(Paths.CatchAll, handleCatchAllRouteError);

// Add error handler
app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
  if (ENV.NodeEnv !== NodeEnvs.Test.valueOf()) {
    pinoLogger.error(err);
  }
  return next(err);
});

export { app };
