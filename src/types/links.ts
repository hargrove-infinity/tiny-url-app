import { Request } from "express";
import { Prisma, PrismaClient, Link } from "@prisma/client";
import { ApplicationError } from "@src/common";
import { Nullable } from "./misc";

export type AddLinkRepoResult = Promise<[Link] | [never, ApplicationError]>;

export type GetFirstLinkRepoResult = Promise<
  [Nullable<Link>] | [never, ApplicationError]
>;

export type LinkResultService = Promise<[Link] | [never, ApplicationError]>;

export interface IAddLinkServiceArgs {
  url: string;
  userId: number;
}

export interface IGetFirstLinkArgs {
  prisma: PrismaClient;
  args: Prisma.LinkFindFirstArgs;
}

interface IAddLinkData {
  url: string;
  shortener: string;
  userId: number;
}

export interface IAddLinkArgs {
  prisma: PrismaClient;
  data: IAddLinkData;
}

interface IAddLinkBody {
  url: string;
}

export type AddLinkRequest = Request<{}, {}, IAddLinkBody>;

interface IRedirectLinkParams {
  shortUrl: string;
}

export type RedirectLinkRequest = Request<IRedirectLinkParams, {}, {}>;
