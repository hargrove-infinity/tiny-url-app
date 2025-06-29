import { Prisma, PrismaClient } from "@prisma/client";
import { ApplicationError } from "@src/common";

export type Nullable<T> = T | null;

export type SyncOperationResult<T> = [T, null] | [null, ApplicationError];

export type AsyncTryCatchReturn<R, E> = Promise<
  [R, undefined] | [undefined, E]
>;

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

export type PrismaDbClient = Parameters<
  Parameters<PrismaClient["$transaction"]>[0]
>[0];
