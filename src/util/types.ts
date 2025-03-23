import { HttpStatusCodes } from "@src/common";
import { OptionalApplicationError } from "@src/types";

interface IErrorData {
  message: string;
  errorCode: string;
  statusCode: HttpStatusCodes;
}

export interface IBuildErrorResponseArgs<T> {
  responseData: T | null;
  errorData: IErrorData | null;
}

export type BuildResponseResult<T> = [T | null, OptionalApplicationError];
