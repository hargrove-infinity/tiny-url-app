import { ApplicationError, HttpStatusCodes, LINKS } from "@src/common";
import { IAddLinkArgs, IGetUniqueLinkArgs } from "@src/types";

/**
 * Get unique link.
 */
async function getUnique({ prisma, args }: IGetUniqueLinkArgs) {
  try {
    return await prisma.link.findUnique(args);
  } catch (error) {
    throw new ApplicationError(LINKS.ERROR_MESSAGES.DATABASE_ERROR_LINKS, {
      errorCode: LINKS.ERROR_CODES.DATABASE_ERROR_GET_UNIQUE_LINK,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}

/**
 * Add one link.
 */
async function add({ prisma, url, shortener }: IAddLinkArgs) {
  try {
    return await prisma.link.create({ data: { url, shortener } });
  } catch (error) {
    throw new ApplicationError(LINKS.ERROR_MESSAGES.DATABASE_ERROR_LINKS, {
      errorCode: LINKS.ERROR_CODES.DATABASE_ERROR_ADD_ONE_LINK,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    });
  }
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkRepo = { getUnique, add } as const;
