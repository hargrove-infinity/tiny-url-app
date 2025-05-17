import { EnvSchema } from "@src/validation";

/******************************************************************************
                                 Setup
******************************************************************************/

export const ENV = EnvSchema.parse({
  NodeEnv: process.env.NODE_ENV,
  Port: process.env.PORT,
  JwtSecretKey: process.env.JWT_SECRET_KEY,
});
