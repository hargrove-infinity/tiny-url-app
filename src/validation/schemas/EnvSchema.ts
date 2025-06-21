import { z } from "zod";
import { NodeEnvs } from "@src/common";
import { isValidMsFormat } from "../helpers";

export const EnvSchema = z.object({
  NodeEnv: z.nativeEnum(NodeEnvs).default(NodeEnvs.Dev),
  Port: z
    .string()
    .default("3000")
    .transform((val) => parseInt(val, 10)),
  JwtSecretKey: z.string().nonempty(),
  SenderEmail: z.string().nonempty(),
  SenderPassword: z.string().nonempty(),
  EXPIRATION_TIME_SIGN_UP_TOKEN: z.string().nonempty().refine(isValidMsFormat),
  EXPIRATION_TIME_AUTH_TOKEN: z.string().nonempty().refine(isValidMsFormat),
});
