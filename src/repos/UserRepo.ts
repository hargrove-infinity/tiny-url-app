import { User } from "@prisma/client";
import { ApplicationError } from "@src/common";
import { pinoLogger } from "@src/logger";
import {
  AsyncTryCatchReturn,
  ICreateUserArgs,
  IGetFirstUserArgs,
  IGetUniqueUserArgs,
  Nullable,
  PrismaError,
} from "@src/types";
import { AppErrorService, asyncTryCatch } from "@src/util";

/**
 * Get first user.
 */
async function getFirst({
  prisma,
  args,
}: IGetFirstUserArgs): AsyncTryCatchReturn<Nullable<User>, ApplicationError> {
  const res = prisma.user.findFirst(args);
  pinoLogger.info("Fetching first user from database");
  const [data, error] = await asyncTryCatch<Nullable<User>, PrismaError>(res);

  if (error) {
    pinoLogger.error(
      { error: error.message },
      "Error during fetching first user from database"
    );
    return [, AppErrorService.Users.getFirstUserDatabaseError()];
  }

  pinoLogger.info("First user successfully fetched from database");
  return [data, undefined];
}

/**
 * Get unique user.
 */
async function getUnique({
  prisma,
  args,
}: IGetUniqueUserArgs): AsyncTryCatchReturn<Nullable<User>, ApplicationError> {
  const res = prisma.user.findUnique(args);
  pinoLogger.info("Fetching unique user from database");
  const [data, error] = await asyncTryCatch<Nullable<User>, PrismaError>(res);

  if (error) {
    pinoLogger.error(
      { error: error.message },
      "Error during fetching unique user from database"
    );
    return [, AppErrorService.Users.getUniqueUserDatabaseError()];
  }

  pinoLogger.info("Unique user successfully fetched from database");
  return [data, undefined];
}

/**
 * Add one user.
 */
async function add({
  prisma,
  args,
}: ICreateUserArgs): AsyncTryCatchReturn<User, ApplicationError> {
  const res = prisma.user.create(args);
  pinoLogger.info("Adding user to database");
  const [data, error] = await asyncTryCatch<User, PrismaError>(res);

  if (error) {
    pinoLogger.error(
      { error: error.message },
      "Error during adding user to database"
    );
    return [, AppErrorService.Users.createUserDatabaseError()];
  }

  pinoLogger.info("User successfully added to database");
  return [data, undefined];
}

export const UserRepo = { add, getFirst, getUnique } as const;
