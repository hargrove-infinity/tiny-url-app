import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "@src/common";
import { formatValidationErrors } from "@src/util";
import { IValidateArgs, ValidateReturn } from "./types";

export function validate<T>({ schema, key }: IValidateArgs): ValidateReturn<T> {
  return (req: Request<T>, res: Response, next: NextFunction): void => {
    const result = key
      ? schema.safeParse(req[key])
      : schema.safeParse(req.body);

    if (!result.success) {
      const errorsPayload = formatValidationErrors({
        issues: result.error.issues,
        body: req.body,
      });

      res.status(HttpStatusCodes.BAD_REQUEST).send({ errors: errorsPayload });
      return;
    }

    next();
  };
}
