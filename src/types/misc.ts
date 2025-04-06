import { ApplicationError } from "@src/common";

export type OperationResult<T> = Promise<[T, null] | [null, ApplicationError]>;

export type NullableOperationResult<T> = Promise<
  [T, null] | [null, ApplicationError] | [null, null]
>;

export type SyncOperationResult<T> = [T, null] | [null, ApplicationError];

export interface IErrorPayloadItem {
  code: string;
  description: string;
  id: string;
  data: string[];
}
