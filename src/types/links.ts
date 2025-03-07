import { Link } from "@prisma/client";

export type PromiseLink = Promise<Link>;
export type PromiseLinkOrNull = Promise<Link | null>;

export interface IAddLinkArgs {
  url: string;
  shortener: string;
}

export interface IAddLinkBody {
  url: string;
}

export interface IRedirectLinkParams {
  shortUrl: string;
}
