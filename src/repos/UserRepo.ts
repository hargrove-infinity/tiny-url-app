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
    const finalArgs = args.omit ? args : { ...args, omit: { password: true } };
    const firstUser = await prisma.user.findFirst(finalArgs);
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
    const finalArgs = args.omit ? args : { ...args, omit: { password: true } };
    const createdUser = await prisma.user.create(finalArgs);
    return [createdUser, null];
  } catch (error) {
    return [null, ErrorHandler.Users.createUserDatabaseError()];
  }
}

export const UserRepo = { add, getFirst } as const;
