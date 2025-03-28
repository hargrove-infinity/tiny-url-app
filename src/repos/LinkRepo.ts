import { ApplicationError, HttpStatusCodes, LINKS } from "@src/common";
import { IAddLinkArgs, IGetFirstLinkArgs, LinkServiceResult } from "@src/types";

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
    return [
      null,
      new ApplicationError(LINKS.ERROR_MESSAGES.DATABASE_ERROR_LINKS, {
        errorCode: LINKS.ERROR_CODES.DATABASE_ERROR_GET_FIRST_LINK,
        statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      }),
    ];
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
    return [
      null,
      new ApplicationError(LINKS.ERROR_MESSAGES.DATABASE_ERROR_LINKS, {
        errorCode: LINKS.ERROR_CODES.DATABASE_ERROR_ADD_ONE_LINK,
        statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      }),
    ];
  }
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkRepo = { getFirst, add } as const;
