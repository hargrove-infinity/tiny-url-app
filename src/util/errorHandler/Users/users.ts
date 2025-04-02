import { ApplicationError, HttpStatusCodes, USERS } from "@src/common";

function getFirstUserDatabaseError(): ApplicationError {
  return new ApplicationError(USERS.ERROR_MESSAGES.DATABASE_ERROR_USERS, {
    errorCode: USERS.ERROR_CODES.DATABASE_ERROR_GET_FIRST_USER,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

function createUserDatabaseError(): ApplicationError {
  return new ApplicationError(USERS.ERROR_MESSAGES.DATABASE_ERROR_USERS, {
    errorCode: USERS.ERROR_CODES.DATABASE_ERROR_CREATE_USER,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

function userWithEmailAlreadyExists(): ApplicationError {
  return new ApplicationError(USERS.ERROR_MESSAGES.SERVICE_ERROR_USERS, {
    errorCode: USERS.ERROR_CODES.USER_WITH_EMAIL_ALREADY_EXISTS,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

function unknownServiceErrorForCreatingUser(): ApplicationError {
  return new ApplicationError(USERS.ERROR_MESSAGES.SERVICE_ERROR_USERS, {
    errorCode: USERS.ERROR_CODES.UNKNOWN_SERVICE_ERROR_FOR_CREATING_USER,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

export const Users = {
  getFirstUserDatabaseError,
  createUserDatabaseError,
  userWithEmailAlreadyExists,
  unknownServiceErrorForCreatingUser,
} as const;
