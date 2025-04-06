import {
  ApplicationError,
  HttpStatusCodes,
  ERROR_DEFINITIONS,
} from "@src/common";

function errorDuringSigningToken(): ApplicationError {
  return new ApplicationError(ERROR_DEFINITIONS.ERROR_SIGNING_TOKEN.message, {
    errorCode: ERROR_DEFINITIONS.ERROR_SIGNING_TOKEN.code,
    errorDescription: ERROR_DEFINITIONS.ERROR_SIGNING_TOKEN.description,
    errorId: ERROR_DEFINITIONS.ERROR_SIGNING_TOKEN.id,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

function errorDuringVerificationToken(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.ERROR_VERIFICATION_TOKEN.message,
    {
      errorCode: ERROR_DEFINITIONS.ERROR_VERIFICATION_TOKEN.code,
      errorDescription: ERROR_DEFINITIONS.ERROR_VERIFICATION_TOKEN.description,
      errorId: ERROR_DEFINITIONS.ERROR_VERIFICATION_TOKEN.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

export const Jwt = {
  errorDuringSigningToken,
  errorDuringVerificationToken,
} as const;
