import { ZodType } from "zod";
import { ISafeParseValidationSchemaArgs } from "./types";

export function safeParseValidationSchema<T extends ZodType<any, any, any>>({
  schema,
  data,
}: ISafeParseValidationSchemaArgs<T>): ReturnType<T["parse"]> | null {
  const result = schema.safeParse(data);
  return !result.success ? null : result.data;
}
