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

function errorDuringVerificationAuthToken(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.ERROR_VERIFICATION_AUTH_TOKEN.message,
    {
      errorCode: ERROR_DEFINITIONS.ERROR_VERIFICATION_AUTH_TOKEN.code,
      errorDescription:
        ERROR_DEFINITIONS.ERROR_VERIFICATION_AUTH_TOKEN.description,
      errorId: ERROR_DEFINITIONS.ERROR_VERIFICATION_AUTH_TOKEN.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

function authTokenExpired(): ApplicationError {
  return new ApplicationError(ERROR_DEFINITIONS.AUTH_TOKEN_EXPIRED.message, {
    errorCode: ERROR_DEFINITIONS.AUTH_TOKEN_EXPIRED.code,
    errorDescription: ERROR_DEFINITIONS.AUTH_TOKEN_EXPIRED.description,
    errorId: ERROR_DEFINITIONS.AUTH_TOKEN_EXPIRED.id,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

function verifiedAuthTokenWrongShape(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.VERIFIED_AUTH_TOKEN_WRONG_SHAPE.message,
    {
      errorCode: ERROR_DEFINITIONS.VERIFIED_AUTH_TOKEN_WRONG_SHAPE.code,
      errorDescription:
        ERROR_DEFINITIONS.VERIFIED_AUTH_TOKEN_WRONG_SHAPE.description,
      errorId: ERROR_DEFINITIONS.VERIFIED_AUTH_TOKEN_WRONG_SHAPE.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

function errorDuringVerificationEmailVerificationToken(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.ERROR_VERIFICATION_EMAIL_VERIFICATION_TOKEN.message,
    {
      errorCode:
        ERROR_DEFINITIONS.ERROR_VERIFICATION_EMAIL_VERIFICATION_TOKEN.code,
      errorDescription:
        ERROR_DEFINITIONS.ERROR_VERIFICATION_EMAIL_VERIFICATION_TOKEN
          .description,
      errorId: ERROR_DEFINITIONS.ERROR_VERIFICATION_EMAIL_VERIFICATION_TOKEN.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

function emailVerificationTokenExpired(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.EMAIL_VERIFICATION_TOKEN_EXPIRED.message,
    {
      errorCode: ERROR_DEFINITIONS.EMAIL_VERIFICATION_TOKEN_EXPIRED.code,
      errorDescription:
        ERROR_DEFINITIONS.EMAIL_VERIFICATION_TOKEN_EXPIRED.description,
      errorId: ERROR_DEFINITIONS.EMAIL_VERIFICATION_TOKEN_EXPIRED.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

function verifiedEmailVerificationTokenWrongShape(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.VERIFIED_EMAIL_VERIFICATION_TOKEN_WRONG_SHAPE.message,
    {
      errorCode:
        ERROR_DEFINITIONS.VERIFIED_EMAIL_VERIFICATION_TOKEN_WRONG_SHAPE.code,
      errorDescription:
        ERROR_DEFINITIONS.VERIFIED_EMAIL_VERIFICATION_TOKEN_WRONG_SHAPE
          .description,
      errorId:
        ERROR_DEFINITIONS.VERIFIED_EMAIL_VERIFICATION_TOKEN_WRONG_SHAPE.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

export const Jwt = {
  errorDuringSigningToken,
  errorDuringVerificationAuthToken,
  verifiedAuthTokenWrongShape,
  authTokenExpired,
  errorDuringVerificationEmailVerificationToken,
  verifiedEmailVerificationTokenWrongShape,
  emailVerificationTokenExpired,
} as const;
