import { Request } from "express";
import { PrismaClient, Prisma } from "@prisma/client";

export interface IRequestSignUpBody {
  name: string;
  username: string;
}

export type RequestSignUpReq = Request<{}, {}, IRequestSignUpBody>;

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

export interface ICompleteSignUpBody {
  signUpToken: string;
  password: string;
}

export type CompleteSignUpRequest = Request<{}, {}, ICompleteSignUpBody>;
