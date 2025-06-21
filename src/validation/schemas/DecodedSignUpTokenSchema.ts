import { z } from "zod";

export const DecodedSignUpTokenSchema = z.object({
  name: z.string().nonempty(),
  username: z.string().nonempty(),
  iat: z.number().gt(0),
  exp: z.number().gt(0),
});
