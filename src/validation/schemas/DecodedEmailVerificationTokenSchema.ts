import { z } from "zod";

export const DecodedEmailVerificationTokenSchema = z.object({
  name: z.string().nonempty(),
  username: z.string().nonempty(),
  password: z.string().nonempty(),
  iat: z.number().gt(0),
  exp: z.number().gt(0),
});
