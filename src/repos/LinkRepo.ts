import {
  IAddLinkArgs,
  IGetFirstLinkArgs,
  GetLinkResult,
  LinkResult,
} from "@src/types";
import { ErrorHandler } from "@src/util";

/**
 * Get first link.
 */
async function getFirst({ prisma, args }: IGetFirstLinkArgs): GetLinkResult {
  try {
    const firstLink = await prisma.link.findFirst(args);
    return [firstLink, null];
  } catch (error) {
    return [null, ErrorHandler.Links.getFirstLinkDatabaseError()];
  }
}

/**
 * Add one link.
 */
async function add({ prisma, data }: IAddLinkArgs): LinkResult {
  try {
    const createdLink = await prisma.link.create({ data });
    return [createdLink, null];
  } catch (error) {
    return [null, ErrorHandler.Links.addOneLinkDatabaseError()];
  }
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkRepo = { getFirst, add } as const;
