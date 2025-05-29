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

function tokenExpired(): ApplicationError {
  return new ApplicationError(ERROR_DEFINITIONS.TOKEN_EXPIRED.message, {
    errorCode: ERROR_DEFINITIONS.TOKEN_EXPIRED.code,
    errorDescription: ERROR_DEFINITIONS.TOKEN_EXPIRED.description,
    errorId: ERROR_DEFINITIONS.TOKEN_EXPIRED.id,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

function verifiedTokenWrongShape(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.VERIFIED_TOKEN_WRONG_SHAPE.message,
    {
      errorCode: ERROR_DEFINITIONS.VERIFIED_TOKEN_WRONG_SHAPE.code,
      errorDescription:
        ERROR_DEFINITIONS.VERIFIED_TOKEN_WRONG_SHAPE.description,
      errorId: ERROR_DEFINITIONS.VERIFIED_TOKEN_WRONG_SHAPE.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

export const Jwt = {
  errorDuringSigningToken,
  errorDuringVerificationToken,
  verifiedTokenWrongShape,
  tokenExpired,
} as const;
