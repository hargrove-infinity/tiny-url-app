import { ApplicationError } from "@src/common";

function reThrowApplicationError(error: ApplicationError): ApplicationError {
  return new ApplicationError(error.message, {
    errorCode: error.errorCode,
    statusCode: error.statusCode,
  });
}

export const Common = {
  reThrowApplicationError,
} as const;
