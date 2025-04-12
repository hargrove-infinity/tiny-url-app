import { z, ZodObject, ZodRawShape } from "zod";
import { ERROR_DEFINITIONS } from "@src/common/ErrorCodes";

export const LinkSchema: ZodObject<ZodRawShape> = z.object({
  url: z
    .string({ message: ERROR_DEFINITIONS.URL_MUST_BE_STRING.code })
    .url({ message: ERROR_DEFINITIONS.URL_PATTERN.code }),
});
