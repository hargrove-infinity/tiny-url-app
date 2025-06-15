import { z } from "zod";

export const DecodedAuthTokenSchema = z.object({
  id: z.number().gt(0),
  name: z.string().nonempty(),
  username: z.string().nonempty(),
  iat: z.number().gt(0),
  exp: z.number().gt(0),
});
