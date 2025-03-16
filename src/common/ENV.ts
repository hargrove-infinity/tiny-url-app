import { EnvSchema } from "@src/validation";

/******************************************************************************
                                 Setup
******************************************************************************/

export const ENV = EnvSchema.parse({
  NodeEnv: process.env.NodeEnv,
  Port: process.env.Port,
});
