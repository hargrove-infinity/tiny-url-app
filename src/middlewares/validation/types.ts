import { Request } from "express";
import { ZodObject, ZodRawShape } from "zod";

export interface IValidateArgs {
  schema: ZodObject<ZodRawShape>;
  key?: keyof Request;
}
