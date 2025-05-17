import helmet from "helmet";
import express from "express";

import { BaseRouter } from "@src/routes";

import { responseFormatter } from "@src/middlewares";
import { ENV, NodeEnvs, Paths } from "@src/common";
import { pinoLoggerHttp } from "@src/logger";
import { handleCatchAllRouteError, handleCatchGlobalError } from "@src/util";

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

// API router
app.use(BaseRouter);

// Catch all routes, not found route error
app.all(Paths.CatchAll, handleCatchAllRouteError);

// Catch global (unhandled) error
app.use(handleCatchGlobalError);

export { app };
