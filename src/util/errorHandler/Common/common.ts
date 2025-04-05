import { ApplicationError, ERROR_DEFINITIONS } from "@src/common";
import { IErrorPayloadItem } from "@src/types";

function reThrowApplicationError(error: ApplicationError): ApplicationError {
  return new ApplicationError(error.message, {
    data: error.data,
    errorCode: error.errorCode,
    errorDescription: error.errorDescription,
    errorId: error.errorId,
    statusCode: error.statusCode,
  });
}

function routeNotFound(url: string): IErrorPayloadItem[] {
  return [
    {
      code: ERROR_DEFINITIONS.ROUTE_NOT_FOUND.code,
      description: ERROR_DEFINITIONS.ROUTE_NOT_FOUND.description,
      id: ERROR_DEFINITIONS.ROUTE_NOT_FOUND.id,
      data: [url],
    },
  ];
}

function unhandledError(errorMessage: string): IErrorPayloadItem[] {
  return [
    {
      code: ERROR_DEFINITIONS.UNHANDLED_ERROR.code,
      description: ERROR_DEFINITIONS.UNHANDLED_ERROR.description,
      id: ERROR_DEFINITIONS.UNHANDLED_ERROR.id,
      data: [errorMessage],
    },
  ];
}

export const Common = {
  reThrowApplicationError,
  routeNotFound,
  unhandledError,
} as const;
