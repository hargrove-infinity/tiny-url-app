import { z } from "zod";
import { ERROR_DEFINITIONS } from "@src/common/ErrorCodes";
import { LoginUserSchema } from "./LoginUserSchema";

export const UserSchema = LoginUserSchema.extend({
  name: z
    .string({ message: ERROR_DEFINITIONS.NAME_USER_MUST_BE_STRING.code })
    .trim()
    .nonempty({ message: ERROR_DEFINITIONS.NAME_USER_MUST_BE_FILLED.code }),
});
