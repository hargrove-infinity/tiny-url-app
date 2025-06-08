import { StringValue } from "ms";
import { SyncOperationResult } from "@src/types";

interface ISignAuthTokenPayload {
  id: number;
  name: string;
  username: string;
}

interface ISignEmailVerificationTokenPayload {
  username: string;
}

type SignTokenPayload =
  | ISignAuthTokenPayload
  | ISignEmailVerificationTokenPayload;

export interface ISignTokenArgs {
  payload: SignTokenPayload;
  expiresIn: StringValue;
}

export interface IAuthTokenPayload {
  id: number;
  name: string;
  username: string;
  iat: number;
  exp: number;
}

export type SignTokenResult = SyncOperationResult<string>;

export type VerifyAuthTokenResult = SyncOperationResult<IAuthTokenPayload>;
