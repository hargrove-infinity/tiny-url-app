import {
  ApplicationError,
  HttpStatusCodes,
  ERROR_DEFINITIONS,
} from "@src/common";

function errorDuringHashingString(): ApplicationError {
  return new ApplicationError(ERROR_DEFINITIONS.ERROR_HASHING_STRING.message, {
    errorCode: ERROR_DEFINITIONS.ERROR_HASHING_STRING.code,
    errorDescription: ERROR_DEFINITIONS.ERROR_HASHING_STRING.description,
    errorId: ERROR_DEFINITIONS.ERROR_HASHING_STRING.id,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

function errorDuringComparingHash(): ApplicationError {
  return new ApplicationError(ERROR_DEFINITIONS.ERROR_COMPARING_HASH.message, {
    errorCode: ERROR_DEFINITIONS.ERROR_COMPARING_HASH.code,
    errorDescription: ERROR_DEFINITIONS.ERROR_COMPARING_HASH.description,
    errorId: ERROR_DEFINITIONS.ERROR_COMPARING_HASH.id,
    statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
  });
}

export const Encryption = {
  errorDuringHashingString,
  errorDuringComparingHash,
} as const;
