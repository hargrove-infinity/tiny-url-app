import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "@src/common";

export function handleCatchAllRouteError(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res
    .status(HttpStatusCodes.NOT_FOUND)
    .send({ error: `Route ${req.originalUrl} does not exist` });
}
