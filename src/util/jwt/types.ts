import { SyncOperationResult } from "@src/types";
import { JwtPayload } from "jsonwebtoken";

export interface ISignTokenPayload {
  id: number;
  name: string;
  username: string;
}

export type SignTokenResult = SyncOperationResult<string>;

export type VerifyTokenResult = SyncOperationResult<string | JwtPayload>;
