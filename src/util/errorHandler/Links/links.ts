import {
  ApplicationError,
  ERROR_DEFINITIONS,
  HttpStatusCodes,
} from "@src/common";

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

export const Links = {
  urlForConvertingNotProvided,
  shortUrlForRedirectingNotProvided,
} as const;
