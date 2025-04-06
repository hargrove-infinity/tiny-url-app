import { ApplicationError } from "@src/common";

export type AsyncOperationResult<T> = Promise<
  [T, null] | [null, ApplicationError]
>;

export type NullableAsyncOperationResult<T> = Promise<
  [T, null] | [null, ApplicationError] | [null, null]
>;

export type SyncOperationResult<T> = [T, null] | [null, ApplicationError];

export interface IErrorPayloadItem {
  code: string;
  description: string;
  id: string;
  data: string[];
}
