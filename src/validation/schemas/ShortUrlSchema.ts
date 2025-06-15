import { z, ZodObject, ZodRawShape } from "zod";
import {
  DEFAULT_SHORT_URL_LENGTH,
  SHORT_URL_REGEXP,
} from "@src/common/Definitions";
import { ERROR_DEFINITIONS } from "@src/common/ErrorCodes";

export const ShortUrlSchema: ZodObject<ZodRawShape> = z.object({
  shortUrl: z
    .string({ message: ERROR_DEFINITIONS.SHORT_URL_MUST_BE_STRING.code })
    .trim()
    .length(
      DEFAULT_SHORT_URL_LENGTH,
      ERROR_DEFINITIONS.SHORT_URL_DEFINED_LENGTH.code
    )
    .regex(SHORT_URL_REGEXP, ERROR_DEFINITIONS.SHORT_URL_PATTERN.code),
});
