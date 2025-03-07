import { z, ZodObject, ZodRawShape } from "zod";

export const LinkSchema: ZodObject<ZodRawShape> = z.object({
  url: z.string().url(),
});
