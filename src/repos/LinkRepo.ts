import { IAddLinkArgs, IGetFirstLinkArgs, LinkServiceResult } from "@src/types";
import { ErrorHandler } from "@src/util";

/**
 * Get first link.
 */
async function getFirst({
  prisma,
  args,
}: IGetFirstLinkArgs): LinkServiceResult {
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
async function add({
  prisma,
  url,
  shortener,
}: IAddLinkArgs): LinkServiceResult {
  try {
    //! TMP added userId
    const createdLink = await prisma.link.create({
      data: { userId: 1, url, shortener },
    });

    return [createdLink, null];
  } catch (error) {
    return [null, ErrorHandler.Links.addOneLinkDatabaseError()];
  }
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkRepo = { getFirst, add } as const;
