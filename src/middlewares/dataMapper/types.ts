import { Request } from "express";
import { IErrorPayloadItem } from "@src/types";

export type AnyObject = Record<string, any>;

export interface ErrorObject {
  errors: IErrorPayloadItem[];
}

export type BodyType =
  | string
  | number
  | boolean
  | AnyObject
  | ErrorObject
  | null;

export interface IFormatResponseArgs {
  req: Request;
  body?: BodyType;
}

interface IResponse {
  path: string;
  method: string;
  payload: string | number | boolean | AnyObject | null;
}

interface IError {
  path: string;
  method: string;
  errors: IErrorPayloadItem[];
}

export type FormatResponseReturn = IResponse | IError;
