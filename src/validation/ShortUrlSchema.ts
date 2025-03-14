import { z, ZodObject, ZodRawShape } from "zod";

export const ShortUrlSchema: ZodObject<ZodRawShape> = z.object({
  shortUrl: z.string(),
});
