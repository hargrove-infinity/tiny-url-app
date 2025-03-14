import { Request, Response, NextFunction } from "express";
import { IValidateArgs } from "./types";

export function validate<T>({ schema, key }: IValidateArgs) {
  return (req: Request<T>, res: Response, next: NextFunction) => {
    const result = key
      ? schema.safeParse(req[key])
      : schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ errors: result.error });
      return;
    }

    next();
  };
}
