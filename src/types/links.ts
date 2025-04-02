import { Request } from "express";
import { Prisma, PrismaClient, Link } from "@prisma/client";
import { NullableOperationResult, OperationResult } from "./misc";

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

interface IAddLinkBody {
  url: string;
}

export type AddLinkRequest = Request<{}, {}, IAddLinkBody>;

interface IRedirectLinkParams {
  shortUrl: string;
}

export type RedirectLinkRequest = Request<IRedirectLinkParams, {}, {}>;
