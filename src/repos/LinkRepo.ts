import {
  IAddLinkArgs,
  IGetFirstLinkArgs,
  PromiseLink,
  PromiseLinkOrNull,
} from "@src/types";

/**
 * Get first link.
 */
async function getFirst({
  prisma,
  args,
}: IGetFirstLinkArgs): PromiseLinkOrNull {
  return await prisma.link.findFirst(args);
}

/**
 * Add one link.
 */
async function add({ prisma, url, shortener }: IAddLinkArgs): PromiseLink {
  return await prisma.link.create({ data: { url, shortener } });
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkRepo = { getFirst, add } as const;
