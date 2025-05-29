import {
  ApplicationError,
  ERROR_DEFINITIONS,
  HttpStatusCodes,
} from "@src/common";

function getFirstUserDatabaseError(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.GET_FIRST_USER_DATABASE_ERROR.message,
    {
      errorCode: ERROR_DEFINITIONS.GET_FIRST_USER_DATABASE_ERROR.code,
      errorDescription:
        ERROR_DEFINITIONS.GET_FIRST_USER_DATABASE_ERROR.description,
      errorId: ERROR_DEFINITIONS.GET_FIRST_USER_DATABASE_ERROR.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

function getUniqueUserDatabaseError(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.GET_UNIQUE_USER_DATABASE_ERROR.message,
    {
      errorCode: ERROR_DEFINITIONS.GET_UNIQUE_USER_DATABASE_ERROR.code,
      errorDescription:
        ERROR_DEFINITIONS.GET_UNIQUE_USER_DATABASE_ERROR.description,
      errorId: ERROR_DEFINITIONS.GET_UNIQUE_USER_DATABASE_ERROR.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

function createUserDatabaseError(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.CREATE_USER_DATABASE_ERROR.message,
    {
      errorCode: ERROR_DEFINITIONS.CREATE_USER_DATABASE_ERROR.code,
      errorDescription:
        ERROR_DEFINITIONS.CREATE_USER_DATABASE_ERROR.description,
      errorId: ERROR_DEFINITIONS.CREATE_USER_DATABASE_ERROR.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

function userWithEmailAlreadyExists(data: string[]): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.USER_WITH_EMAIL_ALREADY_EXISTS.message,
    {
      data,
      errorCode: ERROR_DEFINITIONS.USER_WITH_EMAIL_ALREADY_EXISTS.code,
      errorDescription:
        ERROR_DEFINITIONS.USER_WITH_EMAIL_ALREADY_EXISTS.description,
      errorId: ERROR_DEFINITIONS.USER_WITH_EMAIL_ALREADY_EXISTS.id,
      statusCode: HttpStatusCodes.BAD_REQUEST,
    }
  );
}

function unknownServiceErrorForCreatingUser(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_CREATION_USER.message,
    {
      errorCode: ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_CREATION_USER.code,
      errorDescription:
        ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_CREATION_USER.description,
      errorId: ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_CREATION_USER.id,
      statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
    }
  );
}

function unknownServiceErrorLoginUser(): ApplicationError {
  return new ApplicationError(
    ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_LOGIN_USER.message,
    {
      errorCode: ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_LOGIN_USER.code,
      errorDescription:
        ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_LOGIN_USER.description,
      errorId: ERROR_DEFINITIONS.UNKNOWN_SERVICE_ERROR_LOGIN_USER.id,
      statusCode: HttpStatusCodes.BAD_REQUEST,
    }
  );
}

function userUnauthorized(data: string[]): ApplicationError {
  return new ApplicationError(ERROR_DEFINITIONS.USER_UNAUTHORIZED.message, {
    data,
    errorCode: ERROR_DEFINITIONS.USER_UNAUTHORIZED.code,
    errorDescription: ERROR_DEFINITIONS.USER_UNAUTHORIZED.description,
    errorId: ERROR_DEFINITIONS.USER_UNAUTHORIZED.id,
    statusCode: HttpStatusCodes.BAD_REQUEST,
  });
}

function loginFailed(): ApplicationError {
  return new ApplicationError(ERROR_DEFINITIONS.LOGIN_FAILED.message, {
    errorCode: ERROR_DEFINITIONS.LOGIN_FAILED.code,
    errorDescription: ERROR_DEFINITIONS.LOGIN_FAILED.description,
    errorId: ERROR_DEFINITIONS.LOGIN_FAILED.id,
    statusCode: HttpStatusCodes.BAD_REQUEST,
  });
}

export const Users = {
  userWithEmailAlreadyExists,
  unknownServiceErrorForCreatingUser,
  unknownServiceErrorLoginUser,
  userUnauthorized,
  loginFailed,
  getFirstUserDatabaseError,
  getUniqueUserDatabaseError,
  createUserDatabaseError,
} as const;
