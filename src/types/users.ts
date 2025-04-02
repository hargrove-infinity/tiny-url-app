import { Request } from "express";
import { PrismaClient, Prisma, User } from "@prisma/client";
import { NullableOperationResult, OperationResult } from "./misc";

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

export type GetFirstUserRepoResult = NullableOperationResult<User>;

export type CreateUserRepoResult = OperationResult<User>;

export type CreateUserServiceResult = OperationResult<User>;
