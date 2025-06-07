import { Common } from "./Common";
import { Email } from "./Email";
import { Encryption } from "./Encryption";
import { Jwt } from "./Jwt";
import { Links } from "./Links";
import { Users } from "./Users";

export const AppErrorService = {
  Common,
  Email,
  Encryption,
  Jwt,
  Links,
  Users,
} as const;
