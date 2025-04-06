import { Request } from "express";
import { PrismaClient, Prisma, User } from "@prisma/client";
import { NullableAsyncOperationResult, AsyncOperationResult } from "./misc";

export interface IAddUserBody {
  name: string;
  username: string;
  password: string;
}

export type AddUserRequest = Request<{}, {}, IAddUserBody>;

export interface IGetFirstUserArgs {
  prisma: PrismaClient;
  args: Prisma.UserFindFirstArgs;
}

export interface ICreateUserArgs {
  prisma: PrismaClient;
  data: IAddUserBody;
}

export type GetFirstUserRepoResult = NullableAsyncOperationResult<User>;

export type CreateUserRepoResult = AsyncOperationResult<User>;

export type CreateUserServiceResult = AsyncOperationResult<User>;

export type LoginUserServiceResult = AsyncOperationResult<string>;

export interface ILoginUserBody {
  username: string;
  password: string;
}

export type LoginUserRequest = Request<{}, {}, ILoginUserBody>;
