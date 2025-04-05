import { z } from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEXP } from "@src/common/Definitions";
import { ERROR_DEFINITIONS } from "@src/common/ErrorCodes";

export const LoginUserSchema = z.object({
  username: z
    .string({ message: ERROR_DEFINITIONS.EMAIL_USER_MUST_BE_STRING.code })
    .nonempty({ message: ERROR_DEFINITIONS.EMAIL_USER_MUST_BE_FILLED.code })
    .email(ERROR_DEFINITIONS.INVALID_EMAIL.code),
  password: z
    .string({ message: ERROR_DEFINITIONS.PASSWORD_MUST_BE_STRING.code })
    .min(
      PASSWORD_MIN_LENGTH,
      ERROR_DEFINITIONS.PASSWORD_MIN_LENGTH_REQUIREMENT.code
    )
    .regex(PASSWORD_REGEXP, ERROR_DEFINITIONS.PASSWORD_PATTERN.code),
});
