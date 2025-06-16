import { z } from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEXP } from "@src/common/Definitions";
import { ERROR_DEFINITIONS } from "@src/common/ErrorCodes";

export const CompleteSignUpSchema = z.object({
  signUpToken: z
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
  password: z
    .string({ message: ERROR_DEFINITIONS.PASSWORD_MUST_BE_STRING.code })
    .trim()
    .nonempty({ message: ERROR_DEFINITIONS.PASSWORD_MUST_BE_FILLED.code })
    .min(
      PASSWORD_MIN_LENGTH,
      ERROR_DEFINITIONS.PASSWORD_MIN_LENGTH_REQUIREMENT.code
    )
    .regex(PASSWORD_REGEXP, ERROR_DEFINITIONS.PASSWORD_PATTERN.code),
});
