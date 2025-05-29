import {
  CreateUserResult,
  GetUserResult,
  ICreateUserArgs,
  IGetFirstUserArgs,
  IGetUniqueUserArgs,
} from "@src/types";
import { AppErrorService } from "@src/util";

/**
 * Get first user.
 */
async function getFirst({ prisma, args }: IGetFirstUserArgs): GetUserResult {
  try {
    const firstUser = await prisma.user.findFirst(args);
    return [firstUser, null];
  } catch (error) {
    return [null, AppErrorService.Users.getFirstUserDatabaseError()];
  }
}

/**
 * Get unique user.
 */
async function getUnique({ prisma, args }: IGetUniqueUserArgs): GetUserResult {
  try {
    const uniqueUser = await prisma.user.findUnique(args);
    return [uniqueUser, null];
  } catch (error) {
    return [null, AppErrorService.Users.getUniqueUserDatabaseError()];
  }
}

/**
 * Add one user.
 */
async function add({ prisma, args }: ICreateUserArgs): CreateUserResult {
  try {
    const createdUser = await prisma.user.create(args);
    return [createdUser, null];
  } catch (error) {
    return [null, AppErrorService.Users.createUserDatabaseError()];
  }
}

export const UserRepo = { add, getFirst, getUnique } as const;
