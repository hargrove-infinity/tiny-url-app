import { z } from "zod";
import { NodeEnvs } from "@src/common";

export const EnvSchema = z.object({
  NodeEnv: z.nativeEnum(NodeEnvs).default(NodeEnvs.Dev),
  Port: z
    .string()
    .default("3000")
    .transform((val) => parseInt(val, 10)),
});
