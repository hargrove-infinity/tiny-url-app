import { ERROR_DEFINITIONS } from "@src/common";
import { IErrorPayloadItem } from "@src/types";

function unknownRouteErrorForCreatingUser(): IErrorPayloadItem[] {
  return [
    {
      code: ERROR_DEFINITIONS.UNKNOWN_ROUTE_ERROR_CREATION_USER.code,
      description:
        ERROR_DEFINITIONS.UNKNOWN_ROUTE_ERROR_CREATION_USER.description,
      id: ERROR_DEFINITIONS.UNKNOWN_ROUTE_ERROR_CREATION_USER.id,
      data: [],
    },
  ];
}

function unknownRouteErrorForLoginUser(): IErrorPayloadItem[] {
  return [
    {
      code: ERROR_DEFINITIONS.UNKNOWN_ROUTE_ERROR_LOGIN_USER.code,
      description: ERROR_DEFINITIONS.UNKNOWN_ROUTE_ERROR_LOGIN_USER.description,
      id: ERROR_DEFINITIONS.UNKNOWN_ROUTE_ERROR_LOGIN_USER.id,
      data: [],
    },
  ];
}

function userUnauthorizedPayload(data: string[]): IErrorPayloadItem[] {
  return [
    {
      code: ERROR_DEFINITIONS.USER_UNAUTHORIZED.code,
      description: ERROR_DEFINITIONS.USER_UNAUTHORIZED.description,
      id: ERROR_DEFINITIONS.USER_UNAUTHORIZED.id,
      data,
    },
  ];
}

function userMissingRequestData(): IErrorPayloadItem[] {
  return [
    {
      code: ERROR_DEFINITIONS.USER_MISSING_REQUEST_DATA.code,
      description: ERROR_DEFINITIONS.USER_MISSING_REQUEST_DATA.description,
      id: ERROR_DEFINITIONS.USER_MISSING_REQUEST_DATA.id,
      data: [],
    },
  ];
}

export const Users = {
  unknownRouteErrorForCreatingUser,
  unknownRouteErrorForLoginUser,
  userUnauthorizedPayload,
  userMissingRequestData,
} as const;
