import { ApplicationError, HttpStatusCodes, LINKS } from "@src/common";

function getFirstLinkDatabaseError(): ApplicationError {
  return new ApplicationError(LINKS.ERROR_MESSAGES.DATABASE_ERROR_LINKS, {
    errorCode: LINKS.ERROR_CODES.DATABASE_ERROR_GET_FIRST_LINK,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

export const Links = { getFirstLinkDatabaseError } as const;
