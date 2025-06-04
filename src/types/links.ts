import { Request } from "express";
import { Prisma, PrismaClient } from "@prisma/client";

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
