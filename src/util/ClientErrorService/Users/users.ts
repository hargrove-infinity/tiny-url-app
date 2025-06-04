import { ERROR_DEFINITIONS } from "@src/common";
import { IErrorPayloadItem } from "@src/types";

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
  userUnauthorizedPayload,
  userMissingRequestData,
} as const;
