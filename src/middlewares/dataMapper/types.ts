export type AnyObject = Record<string, any>;

export interface ErrorObject {
  error: string;
}

export type BodyType =
  | string
  | number
  | boolean
  | AnyObject
  | ErrorObject
  | null;
