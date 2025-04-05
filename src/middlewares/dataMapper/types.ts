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
