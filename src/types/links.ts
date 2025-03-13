import { Prisma, PrismaClient, Link } from "@prisma/client";

export type PromiseLink = Promise<Link>;
export type PromiseLinkOrNull = Promise<Link | null>;

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
