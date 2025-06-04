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

function registrationFailed(): ApplicationError {
  return new ApplicationError(ERROR_DEFINITIONS.REGISTRATION_FAILED.message, {
    errorCode: ERROR_DEFINITIONS.REGISTRATION_FAILED.code,
    errorDescription: ERROR_DEFINITIONS.REGISTRATION_FAILED.description,
    errorId: ERROR_DEFINITIONS.REGISTRATION_FAILED.id,
    statusCode: HttpStatusCodes.BAD_REQUEST,
  });
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
  registrationFailed,
  userUnauthorized,
  loginFailed,
  getFirstUserDatabaseError,
  getUniqueUserDatabaseError,
  createUserDatabaseError,
} as const;
