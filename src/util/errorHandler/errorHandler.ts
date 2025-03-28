import { ApplicationError } from "@src/common";
import { Links } from "./Links";

function reThrowApplicationError(error: ApplicationError): ApplicationError {
  return new ApplicationError(error.message, {
    errorCode: error.errorCode,
    statusCode: error.statusCode,
  });
}

const Common = { reThrowApplicationError } as const;

export const ErrorHandler = { Common, Links } as const;
