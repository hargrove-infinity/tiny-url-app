import { StringValue } from "ms";
import { IRequestSignUpBody, SyncOperationResult } from "@src/types";

interface ISignAuthTokenPayload {
  id: number;
  name: string;
  username: string;
}

type SignTokenPayload = ISignAuthTokenPayload | IRequestSignUpBody;

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

export interface ISignUpTokenPayload {
  name: string;
  username: string;
  iat: number;
  exp: number;
}

export type SignTokenResult = SyncOperationResult<string>;

export type VerifyAuthTokenResult = SyncOperationResult<IAuthTokenPayload>;

export type VerifySignUpTokenResult = SyncOperationResult<ISignUpTokenPayload>;
