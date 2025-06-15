import { ZodType } from "zod";

export interface ISafeParseValidationSchemaArgs<
  T extends ZodType<any, any, any>
> {
  schema: T;
  data: unknown;
}
