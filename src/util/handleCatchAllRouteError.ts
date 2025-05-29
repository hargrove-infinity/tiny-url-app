import { Request, Response } from "express";
import { HttpStatusCodes } from "@src/common";
import { ClientErrorService } from "./ClientErrorService";

export function handleCatchAllRouteError(req: Request, res: Response): void {
  res
    .status(HttpStatusCodes.NOT_FOUND)
    .send({ errors: ClientErrorService.Common.routeNotFound(req.originalUrl) });
}
