import { z } from "zod";
import { ERROR_DEFINITIONS } from "@src/common/ErrorCodes";

export const EmailVerificationSchema = z.object({
  hash: z
    .string({
      message: ERROR_DEFINITIONS.EMAIL_VERIFICATION_HASH_MUST_BE_STRING.code,
    })
    .trim()
    .nonempty({
      message: ERROR_DEFINITIONS.EMAIL_VERIFICATION_HASH_MUST_BE_FILLED.code,
    })
    .jwt({
      message: ERROR_DEFINITIONS.EMAIL_VERIFICATION_HASH_MUST_BE_JWT.code,
    }),
});
