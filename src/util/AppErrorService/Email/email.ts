import {
  ApplicationError,
  ERROR_DEFINITIONS,
  HttpStatusCodes,
} from "@src/common";

function emailConfirmationError(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.ERROR_EMAIL_CONFIRMATION.message,
    {
      errorCode: ERROR_DEFINITIONS.ERROR_EMAIL_CONFIRMATION.code,
      errorDescription: ERROR_DEFINITIONS.ERROR_EMAIL_CONFIRMATION.description,
      errorId: ERROR_DEFINITIONS.ERROR_EMAIL_CONFIRMATION.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

export const Email = {
  emailConfirmationError,
} as const;
