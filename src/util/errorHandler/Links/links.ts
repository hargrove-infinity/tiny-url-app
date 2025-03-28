import { ApplicationError, HttpStatusCodes, LINKS } from "@src/common";

function addOneLinkDatabaseError(): ApplicationError {
  return new ApplicationError(LINKS.ERROR_MESSAGES.DATABASE_ERROR_LINKS, {
    errorCode: LINKS.ERROR_CODES.DATABASE_ERROR_ADD_ONE_LINK,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

function getFirstLinkDatabaseError(): ApplicationError {
  return new ApplicationError(LINKS.ERROR_MESSAGES.DATABASE_ERROR_LINKS, {
    errorCode: LINKS.ERROR_CODES.DATABASE_ERROR_GET_FIRST_LINK,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

function urlForConvertingNotProvided(): ApplicationError {
  return new ApplicationError(LINKS.ERROR_MESSAGES.SERVICE_ERROR_LINKS, {
    errorCode: LINKS.ERROR_CODES.URL_FOR_CONVERTING_NOT_PROVIDED,
    statusCode: HttpStatusCodes.BAD_REQUEST,
  });
}

function errorWhileCreationLink(): ApplicationError {
  return new ApplicationError(LINKS.ERROR_MESSAGES.SERVICE_ERROR_LINKS, {
    errorCode: LINKS.ERROR_CODES.ERROR_WHILE_CREATION_LINK,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

function unknownServiceErrorForCreatingLink(): ApplicationError {
  return new ApplicationError(LINKS.ERROR_MESSAGES.SERVICE_ERROR_LINKS, {
    errorCode: LINKS.ERROR_CODES.UNKNOWN_SERVICE_ERROR_FOR_CREATING_SHORT_URL,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

function shortUrlForRedirectingNotProvided(): ApplicationError {
  return new ApplicationError(LINKS.ERROR_MESSAGES.SERVICE_ERROR_LINKS, {
    errorCode: LINKS.ERROR_CODES.SHORT_URL_FOR_REDIRECTING_NOT_PROVIDED,
    statusCode: HttpStatusCodes.BAD_REQUEST,
  });
}

function shortUrlForRedirectingNotFoundInDatabase(): ApplicationError {
  return new ApplicationError(LINKS.ERROR_MESSAGES.SERVICE_ERROR_LINKS, {
    errorCode:
      LINKS.ERROR_CODES.SHORT_URL_FOR_REDIRECTING_NOT_FOUND_IN_DATABASE,
    statusCode: HttpStatusCodes.NOT_FOUND,
  });
}

function unknownServiceErrorForRedirectingToUrl(): ApplicationError {
  return new ApplicationError(LINKS.ERROR_MESSAGES.SERVICE_ERROR_LINKS, {
    errorCode: LINKS.ERROR_CODES.UNKNOWN_SERVICE_ERROR_FOR_REDIRECTING_TO_URL,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

export const Links = {
  addOneLinkDatabaseError,
  getFirstLinkDatabaseError,
  urlForConvertingNotProvided,
  errorWhileCreationLink,
  unknownServiceErrorForCreatingLink,
  shortUrlForRedirectingNotProvided,
  shortUrlForRedirectingNotFoundInDatabase,
  unknownServiceErrorForRedirectingToUrl,
} as const;
