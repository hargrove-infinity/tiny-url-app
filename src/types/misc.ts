import { Prisma } from "@prisma/client";
import { ApplicationError } from "@src/common";

export type Nullable<T> = T | null;

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

export type PrismaError =
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientRustPanicError
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientValidationError
  | Error;
