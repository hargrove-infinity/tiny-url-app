import {
  CreateUserRepoResult,
  GetFirstUserRepoResult,
  ICreateUserArgs,
  IGetFirstUserArgs,
} from "@src/types";
import { ErrorHandler } from "@src/util";

/**
 * Get first user.
 */
async function getFirst({
  prisma,
  args,
}: IGetFirstUserArgs): GetFirstUserRepoResult {
  try {
    const firstUser = await prisma.user.findFirst(args);
    return [firstUser, null];
  } catch (error) {
    return [null, ErrorHandler.Users.getFirstUserDatabaseError()];
  }
}

/**
 * Add one user.
 */
async function add({ prisma, args }: ICreateUserArgs): CreateUserRepoResult {
  try {
    const createdUser = await prisma.user.create(args);
    return [createdUser, null];
  } catch (error) {
    return [null, ErrorHandler.Users.createUserDatabaseError()];
  }
}

export const UserRepo = { add, getFirst } as const;
