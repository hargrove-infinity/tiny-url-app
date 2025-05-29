import {
  ApplicationError,
  ERROR_DEFINITIONS,
  HttpStatusCodes,
} from "@src/common";

function reThrowApplicationError(error: ApplicationError): ApplicationError {
  return new ApplicationError(error.message, {
    data: error.data,
    errorCode: error.errorCode,
    errorDescription: error.errorDescription,
    errorId: error.errorId,
    statusCode: error.statusCode,
  });
}

function internalServerError(): ApplicationError {
  return new ApplicationError(ERROR_DEFINITIONS.INTERNAL_SERVER_ERROR.message, {
    errorCode: ERROR_DEFINITIONS.INTERNAL_SERVER_ERROR.code,
    errorDescription: ERROR_DEFINITIONS.INTERNAL_SERVER_ERROR.description,
    errorId: ERROR_DEFINITIONS.INTERNAL_SERVER_ERROR.id,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

export const Common = {
  reThrowApplicationError,
  internalServerError,
} as const;
