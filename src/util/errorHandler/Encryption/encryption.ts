import { ApplicationError, HttpStatusCodes, ENCRYPTION } from "@src/common";

function errorDuringHashingString(): ApplicationError {
  return new ApplicationError(ENCRYPTION.ERROR_MESSAGES.ERROR_ENCRYPTION, {
    errorCode: ENCRYPTION.ERROR_CODES.ERROR_HASHING_STRING,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

function errorDuringComparingHash(): ApplicationError {
  return new ApplicationError(ENCRYPTION.ERROR_MESSAGES.ERROR_ENCRYPTION, {
    errorCode: ENCRYPTION.ERROR_CODES.ERROR_COMPARING_HASH,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

export const Encryption = {
  errorDuringHashingString,
  errorDuringComparingHash,
} as const;
