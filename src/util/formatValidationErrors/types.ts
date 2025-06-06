import { ZodIssue } from "zod";

export interface IFormatValidationErrorsArgs {
  issues: ZodIssue[];
  body: Record<string, any>;
}
