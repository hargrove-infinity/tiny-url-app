import {
  ApplicationError,
  ERROR_DEFINITIONS,
  HttpStatusCodes,
} from "@src/common";
import { IErrorPayloadItem } from "@src/types";

function addOneLinkDatabaseError(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.CREATE_LINK_DATABASE_ERROR.message,
    {
      errorCode: ERROR_DEFINITIONS.CREATE_LINK_DATABASE_ERROR.code,
      errorDescription:
        ERROR_DEFINITIONS.CREATE_LINK_DATABASE_ERROR.description,
      errorId: ERROR_DEFINITIONS.CREATE_LINK_DATABASE_ERROR.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

function getFirstLinkDatabaseError(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.GET_FIRST_LINK_DATABASE_ERROR.message,
    {
      errorCode: ERROR_DEFINITIONS.GET_FIRST_LINK_DATABASE_ERROR.code,
      errorDescription:
        ERROR_DEFINITIONS.GET_FIRST_LINK_DATABASE_ERROR.description,
      errorId: ERROR_DEFINITIONS.GET_FIRST_LINK_DATABASE_ERROR.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

function urlForConvertingNotProvided(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.URL_FOR_CONVERTING_NOT_PROVIDED.message,
    {
      errorCode: ERROR_DEFINITIONS.URL_FOR_CONVERTING_NOT_PROVIDED.code,
      errorDescription:
        ERROR_DEFINITIONS.URL_FOR_CONVERTING_NOT_PROVIDED.description,
      errorId: ERROR_DEFINITIONS.URL_FOR_CONVERTING_NOT_PROVIDED.id,
      statusCode: HttpStatusCodes.BAD_REQUEST,
    }
  );
}

function unknownServiceErrorForCreatingLink(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_CREATION_LINK.message,
    {
      errorCode: ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_CREATION_LINK.code,
      errorDescription:
        ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_CREATION_LINK.description,
      errorId: ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_CREATION_LINK.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

function shortUrlForRedirectingNotProvided(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.SHORT_URL_FOR_REDIRECTING_NOT_PROVIDED.message,
    {
      errorCode: ERROR_DEFINITIONS.SHORT_URL_FOR_REDIRECTING_NOT_PROVIDED.code,
      errorDescription:
        ERROR_DEFINITIONS.SHORT_URL_FOR_REDIRECTING_NOT_PROVIDED.description,
      errorId: ERROR_DEFINITIONS.SHORT_URL_FOR_REDIRECTING_NOT_PROVIDED.id,
      statusCode: HttpStatusCodes.BAD_REQUEST,
    }
  );
}

function shortUrlForRedirectingNotFoundInDatabase(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.SHORT_URL_FOR_REDIRECTING_NOT_FOUND_DATABASE.message,
    {
      errorCode:
        ERROR_DEFINITIONS.SHORT_URL_FOR_REDIRECTING_NOT_FOUND_DATABASE.code,
      errorDescription:
        ERROR_DEFINITIONS.SHORT_URL_FOR_REDIRECTING_NOT_FOUND_DATABASE
          .description,
      errorId:
        ERROR_DEFINITIONS.SHORT_URL_FOR_REDIRECTING_NOT_FOUND_DATABASE.id,
      statusCode: HttpStatusCodes.NOT_FOUND,
    }
  );
}

function unknownServiceErrorForRedirectingToUrl(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_REDIRECT_LINK.message,
    {
      errorCode: ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_REDIRECT_LINK.code,
      errorDescription:
        ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_REDIRECT_LINK.description,
      errorId: ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_REDIRECT_LINK.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

function unknownRouteErrorCreationLink(): IErrorPayloadItem[] {
  return [
    {
      code: ERROR_DEFINITIONS.UNKNOWN_ROUTE_ERROR_CREATION_LINK.code,
      description:
        ERROR_DEFINITIONS.UNKNOWN_ROUTE_ERROR_CREATION_LINK.description,
      id: ERROR_DEFINITIONS.UNKNOWN_ROUTE_ERROR_CREATION_LINK.id,
      data: [],
    },
  ];
}

function unknownRouteErrorRedirectingToUrl(): IErrorPayloadItem[] {
  return [
    {
      code: ERROR_DEFINITIONS.UNKNOWN_ROUTE_ERROR_REDIRECT_URL.code,
      description:
        ERROR_DEFINITIONS.UNKNOWN_ROUTE_ERROR_REDIRECT_URL.description,
      id: ERROR_DEFINITIONS.UNKNOWN_ROUTE_ERROR_REDIRECT_URL.id,
      data: [],
    },
  ];
}

export const Links = {
  addOneLinkDatabaseError,
  getFirstLinkDatabaseError,
  urlForConvertingNotProvided,
  unknownServiceErrorForCreatingLink,
  shortUrlForRedirectingNotProvided,
  shortUrlForRedirectingNotFoundInDatabase,
  unknownServiceErrorForRedirectingToUrl,
  unknownRouteErrorCreationLink,
  unknownRouteErrorRedirectingToUrl,
} as const;
