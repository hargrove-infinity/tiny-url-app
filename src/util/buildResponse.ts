import { ApplicationError } from "@src/common";
import { BuildResponseResult, IBuildErrorResponseArgs } from "./types";

export function buildResponse<T>({
  responseData,
  errorData,
}: IBuildErrorResponseArgs<T>): BuildResponseResult<T> {
  return [
    responseData,
    errorData
      ? new ApplicationError(errorData.message, {
          errorCode: errorData.errorCode,
          statusCode: errorData.statusCode,
        })
      : null,
  ];
}
