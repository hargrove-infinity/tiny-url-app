import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape } from "zod";

export interface IValidateArgs {
  schema: ZodObject<ZodRawShape>;
  key?: "params" | "body" | "query";
}

export type ValidateReturn<T> = (
  req: Request<T>,
  res: Response,
  next: NextFunction
) => void;
