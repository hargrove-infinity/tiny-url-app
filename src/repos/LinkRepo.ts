import { Prisma } from "@prisma/client";
import { IAddLinkArgs, PromiseLink, PromiseLinkOrNull } from "@src/types";
import { prisma } from "@src/util";

/**
 * Get first link.
 */
async function getFirst(args: Prisma.LinkFindFirstArgs): PromiseLinkOrNull {
  return await prisma.link.findFirst(args);
}

/**
 * Add one link.
 */
async function add({ url, shortener }: IAddLinkArgs): PromiseLink {
  return await prisma.link.create({ data: { url, shortener } });
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkRepo = { getFirst, add } as const;
