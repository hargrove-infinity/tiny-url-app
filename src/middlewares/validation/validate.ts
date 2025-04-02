import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "@src/common";
import { IValidateArgs } from "./types";

export function validate<T>({ schema, key }: IValidateArgs) {
  return (req: Request<T>, res: Response, next: NextFunction) => {
    const result = key
      ? schema.safeParse(req[key])
      : schema.safeParse(req.body);

    if (!result.success) {
      res.status(HttpStatusCodes.BAD_REQUEST).send({ error: result.error });
      return;
    }

    next();
  };
}
