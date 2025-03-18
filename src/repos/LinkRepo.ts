import { ApplicationError, HttpStatusCodes, LINKS } from "@src/common";
import { IAddLinkArgs, IGetFirstLinkArgs } from "@src/types";

/**
 * Get first link.
 */
async function getFirst({ prisma, args }: IGetFirstLinkArgs) {
  try {
    const foundLink = await prisma.link.findFirst(args);

    if (foundLink) {
      return foundLink;
    }

    throw new ApplicationError(LINKS.ERROR_MESSAGES.DATABASE_ERROR_LINKS, {
      errorCode: LINKS.ERROR_CODES.FIRST_LINK_NOT_FOUND_IN_DATABASE,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    });
  } catch (error) {
    if (error instanceof ApplicationError) {
      throw new ApplicationError(error.message, {
        errorCode: error.appErrorCode,
        statusCode: error.httpStatusCode,
      });
    }

    throw new ApplicationError(LINKS.ERROR_MESSAGES.DATABASE_ERROR_LINKS, {
      errorCode: LINKS.ERROR_CODES.DATABASE_ERROR_GET_FIRST_LINK,
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

export const LinkRepo = { getFirst, add } as const;
