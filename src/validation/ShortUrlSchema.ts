import { z, ZodObject, ZodRawShape } from "zod";
import {
  DEFAULT_SHORT_URL_LENGTH,
  SHORT_URL_REGEXP,
} from "@src/common/Constants";
import { LINKS } from "@src/common/Error";

export const ShortUrlSchema: ZodObject<ZodRawShape> = z.object({
  shortUrl: z
    .string()
    .length(
      DEFAULT_SHORT_URL_LENGTH,
      LINKS.VALIDATION_MESSAGES.DEFINED_SHORT_URL_LENGTH
    )
    .regex(SHORT_URL_REGEXP, LINKS.VALIDATION_MESSAGES.SHORT_URL_PATTERN),
});
