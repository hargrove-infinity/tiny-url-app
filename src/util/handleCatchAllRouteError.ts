import { Request, Response } from "express";
import { HttpStatusCodes } from "@src/common";
import { ErrorHandler } from "./errorHandler";

export function handleCatchAllRouteError(req: Request, res: Response) {
  res
    .status(HttpStatusCodes.NOT_FOUND)
    .send({ errors: ErrorHandler.Common.routeNotFound(req.originalUrl) });
}
