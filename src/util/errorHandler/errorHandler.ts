import { Common } from "./Common";
import { Encryption } from "./Encryption";
import { Jwt } from "./Jwt";
import { Links } from "./Links";
import { Users } from "./Users";

export const ErrorHandler = {
  Common,
  Encryption,
  Jwt,
  Links,
  Users,
} as const;
