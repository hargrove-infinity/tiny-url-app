import { ZodType } from "zod";

interface IArgs<T extends ZodType<any, any, any>> {
  schema: T;
  data: unknown;
}

export function safeParseValidationSchema<T extends ZodType<any, any, any>>({
  schema,
  data,
}: IArgs<T>): ReturnType<T["parse"]> | null {
  const result = schema.safeParse(data);
  return !result.success ? null : result.data;
}
