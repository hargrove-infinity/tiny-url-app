import { ERROR_DEFINITIONS } from "@src/common";
import { IErrorPayloadItem } from "@src/types";

function authorizationTokenMissing(): IErrorPayloadItem[] {
  return [
    {
      code: ERROR_DEFINITIONS.AUTHORIZATION_TOKEN_MISSING.code,
      description: ERROR_DEFINITIONS.AUTHORIZATION_TOKEN_MISSING.description,
      id: ERROR_DEFINITIONS.AUTHORIZATION_TOKEN_MISSING.id,
      data: [],
    },
  ];
}

export const Token = {
  authorizationTokenMissing,
} as const;
