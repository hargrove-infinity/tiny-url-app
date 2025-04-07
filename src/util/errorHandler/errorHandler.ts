import { Common } from "./Common";
import { Encryption } from "./Encryption";
import { Jwt } from "./Jwt";
import { Links } from "./Links";
import { Token } from "./Token";
import { Users } from "./Users";

export const ErrorHandler = {
  Common,
  Encryption,
  Jwt,
  Links,
  Token,
  Users,
} as const;
