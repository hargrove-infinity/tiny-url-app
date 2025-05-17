import { SyncOperationResult } from "@src/types";

export interface ISignTokenPayload {
  id: number;
  name: string;
  username: string;
}

export interface ITokenPayload {
  id: number;
  name: string;
  username: string;
  iat: number;
  exp: number;
}

export type SignTokenResult = SyncOperationResult<string>;

export type VerifyTokenResult = SyncOperationResult<ITokenPayload>;
