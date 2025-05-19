import { Request } from "express";
import { Prisma, PrismaClient, Link } from "@prisma/client";
import { Nullable } from "./misc";
import { ApplicationError } from "@src/common";

export type AddLinkRepoResult = Promise<
  [Link, undefined] | [undefined, ApplicationError]
>;

export type GetFirstLinkRepoResult = Promise<
  [Nullable<Link>, undefined] | [undefined, ApplicationError]
>;

export type LinkResultService = Promise<
  [Link, undefined] | [undefined, ApplicationError]
>;

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
