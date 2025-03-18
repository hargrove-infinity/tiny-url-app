import { Prisma, PrismaClient, Link } from "@prisma/client";
import { ApplicationError } from "@src/common";

type OptionalLink = Link | null;

type OptionalApplicationError = ApplicationError | null;

export type LinkServiceResult = Promise<
  [OptionalLink, OptionalApplicationError]
>;

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
