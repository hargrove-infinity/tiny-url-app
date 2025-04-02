import { ApplicationError } from "@src/common";

export type OperationResult<T> = Promise<[T, null] | [null, ApplicationError]>;

export type NullableOperationResult<T> = Promise<
  [T, null] | [null, ApplicationError] | [null, null]
>;
