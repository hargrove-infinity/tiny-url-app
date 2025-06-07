import { Request } from "express";
import { ParsedQs } from "qs";
import { PrismaClient, Prisma } from "@prisma/client";

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

export interface ILoginUserBody {
  username: string;
  password: string;
}

export type LoginUserRequest = Request<{}, {}, ILoginUserBody>;

interface IEmailVerificationQueryParams extends ParsedQs {
  hash: string;
}

export type EmailVerificationRequest = Request<
  {},
  {},
  {},
  IEmailVerificationQueryParams
>;
