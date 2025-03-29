import { Prisma, PrismaClient, Link } from "@prisma/client";
import { ApplicationError } from "@src/common";

export type OperationResult<T> = Promise<[T, null] | [null, ApplicationError]>;

export type NullableOperationResult<T> = Promise<
  [T, null] | [null, ApplicationError] | [null, null]
>;

export type GetFirstLinkRepoResult = NullableOperationResult<Link>;

export type AddLinkRepoResult = OperationResult<Link>;

export type AddOneLinkServiceResult = OperationResult<Link>;

export type RedirectToUrlServiceResult = OperationResult<Link>;

export interface IGetFirstLinkArgs {
  prisma: PrismaClient;
  args: Prisma.LinkFindFirstArgs;
}

export interface IAddLinkArgs {
  prisma: PrismaClient;
  url: string;
  shortener: string;
}

export interface IAddLinkBody {
  url: string;
}

export interface IRedirectLinkParams {
  shortUrl: string;
}
