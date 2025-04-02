import { z } from "zod";
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEXP } from "@src/common/Definitions";
import { USERS } from "@src/common/ErrorCodes";

export const UserSchema = z.object({
  name: z.string(),
  username: z.string().email(),
  password: z
    .string()
    .min(
      PASSWORD_MIN_LENGTH,
      USERS.VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH_REQUIREMENT
    )
    .regex(PASSWORD_REGEXP, USERS.VALIDATION_MESSAGES.PASSWORD_PATTERN),
});
