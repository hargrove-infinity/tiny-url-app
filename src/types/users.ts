import { Request } from "express";
import { PrismaClient, Prisma, User } from "@prisma/client";
import { Nullable } from "./misc";
import { ApplicationError } from "@src/common";

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

export type GetFirstUserRepoResult = Promise<
  [Nullable<User>, undefined] | [undefined, ApplicationError]
>;

export type GetUniqueUserRepoResult = Promise<
  [Nullable<User>, undefined] | [undefined, ApplicationError]
>;

export type AddUserRepoResult = Promise<
  [User, undefined] | [undefined, ApplicationError]
>;

export type AddUserServiceResult = Promise<
  [User, undefined] | [undefined, ApplicationError]
>;

export type LoginUserServiceResult = Promise<
  [string, undefined] | [undefined, ApplicationError]
>;

export interface ILoginUserBody {
  username: string;
  password: string;
}

export type LoginUserRequest = Request<{}, {}, ILoginUserBody>;
