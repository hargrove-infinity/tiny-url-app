import helmet from "helmet";
import express, { Request, Response, NextFunction } from "express";

import "express-async-errors";

import { BaseRouter } from "@src/routes";

import { DEFAULT_ERROR_MESSAGE, ENV, NodeEnvs, Paths } from "@src/common";
import { pinoLogger, pinoLoggerHttp } from "@src/logger";
import { handleCatchAllRouteError } from "@src/util";
import { responseFormatter } from "@src/middlewares";

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

// Response formatter middleware
app.use(responseFormatter);

// Security
if (ENV.NodeEnv === NodeEnvs.Production) {
  app.use(helmet());
}

// Add APIs, must be after middleware
app.use(BaseRouter);

app.all(Paths.CatchAll, handleCatchAllRouteError);

// Add error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (ENV.NodeEnv !== NodeEnvs.Test.valueOf()) {
    pinoLogger.error(err);
  }

  res.status(500).send({ error: err.message || DEFAULT_ERROR_MESSAGE });
});

export { app };
