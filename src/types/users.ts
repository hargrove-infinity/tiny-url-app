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

export interface IGetUniqueUserArgs {
  prisma: PrismaClient;
  args: Prisma.UserFindUniqueArgs;
}

export interface ICreateUserArgs {
  prisma: PrismaClient;
  args: Prisma.UserCreateArgs;
}

export type GetUserResult = NullableAsyncOperationResult<User>;

export type CreateUserResult = AsyncOperationResult<User>;

export type LoginUserServiceResult = AsyncOperationResult<string>;

export interface ILoginUserBody {
  username: string;
  password: string;
}

export type LoginUserRequest = Request<{}, {}, ILoginUserBody>;
