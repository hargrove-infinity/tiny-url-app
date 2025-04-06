import { Request } from "express";
import { Prisma, PrismaClient, Link } from "@prisma/client";
import { NullableAsyncOperationResult, AsyncOperationResult } from "./misc";

export type GetFirstLinkRepoResult = NullableAsyncOperationResult<Link>;

export type AddLinkRepoResult = AsyncOperationResult<Link>;

export type AddOneLinkServiceResult = AsyncOperationResult<Link>;

export type RedirectToUrlServiceResult = AsyncOperationResult<Link>;

export interface IGetFirstLinkArgs {
  prisma: PrismaClient;
  args: Prisma.LinkFindFirstArgs;
}

export interface IAddLinkArgs {
  prisma: PrismaClient;
  url: string;
  shortener: string;
}

interface IAddLinkBody {
  url: string;
}

export type AddLinkRequest = Request<{}, {}, IAddLinkBody>;

interface IRedirectLinkParams {
  shortUrl: string;
}

export type RedirectLinkRequest = Request<IRedirectLinkParams, {}, {}>;
