import { Link, Prisma } from "@prisma/client";
import { ApplicationError } from "@src/common";

export type Nullable<T> = T | null;
type AsyncReturn<R, E> = Promise<[R] | [undefined, E]>;
type PromiseType = Promise<unknown>;
export type PrismaError =
  | Prisma.PrismaClientKnownRequestError
  | Prisma.PrismaClientUnknownRequestError
  | Prisma.PrismaClientRustPanicError
  | Prisma.PrismaClientInitializationError
  | Prisma.PrismaClientValidationError
  | Error;

export type RepoResult = Promise<
  [Link | null, undefined] | [undefined, ApplicationError]
>;

export async function asyncTryCatch<R = unknown, E = unknown>(
  promise: PromiseType
): AsyncReturn<R, E> {
  try {
    const data = await promise;
    return [data as R];
  } catch (error) {
    return [, error];
  }
}
