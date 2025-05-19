import { Link } from "@prisma/client";
import {
  IAddLinkArgs,
  IGetFirstLinkArgs,
  GetFirstLinkRepoResult,
  AddLinkRepoResult,
  Nullable,
  PrismaError,
} from "@src/types";
import { asyncTryCatch, ErrorHandler } from "@src/util";

/**
 * Get first link.
 */
async function getFirst({
  prisma,
  args,
}: IGetFirstLinkArgs): GetFirstLinkRepoResult {
  const res = prisma.link.findFirst(args);
  const [data, error] = await asyncTryCatch<Nullable<Link>, PrismaError>(res);

  if (error) {
    return [, ErrorHandler.Links.getFirstLinkDatabaseError()];
  }

  return [data, undefined];
}

/**
 * Add one link.
 */
async function add({ prisma, data }: IAddLinkArgs): AddLinkRepoResult {
  const res = prisma.link.create({ data });
  const [link, error] = await asyncTryCatch<Link, PrismaError>(res);

  if (error) {
    return [, ErrorHandler.Links.addOneLinkDatabaseError()];
  }

  return [link, undefined];
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkRepo = { getFirst, add } as const;
