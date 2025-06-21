import {
  ApplicationError,
  ERROR_DEFINITIONS,
  HttpStatusCodes,
} from "@src/common";

function signUpLinkEmailError(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.ERROR_SIGN_UP_LINK_EMAIL.message,
    {
      errorCode: ERROR_DEFINITIONS.ERROR_SIGN_UP_LINK_EMAIL.code,
      errorDescription: ERROR_DEFINITIONS.ERROR_SIGN_UP_LINK_EMAIL.description,
      errorId: ERROR_DEFINITIONS.ERROR_SIGN_UP_LINK_EMAIL.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

export const Email = {
  signUpLinkEmailError,
} as const;
