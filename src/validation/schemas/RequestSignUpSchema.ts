import { z } from "zod";
import { ERROR_DEFINITIONS } from "@src/common/ErrorCodes";

export const RequestSignUpSchema = z.object({
  name: z
    .string({ message: ERROR_DEFINITIONS.NAME_USER_MUST_BE_STRING.code })
    .trim()
    .nonempty({ message: ERROR_DEFINITIONS.NAME_USER_MUST_BE_FILLED.code }),
  username: z
    .string({ message: ERROR_DEFINITIONS.EMAIL_USER_MUST_BE_STRING.code })
    .trim()
    .nonempty({ message: ERROR_DEFINITIONS.EMAIL_USER_MUST_BE_FILLED.code })
    .email(ERROR_DEFINITIONS.INVALID_EMAIL.code),
});
