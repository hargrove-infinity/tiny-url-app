import { ERROR_DEFINITIONS } from "@src/common";
import { IErrorPayloadItem } from "@src/types";
import { IFormatValidationErrorsArgs } from "./types";

export function formatValidationErrors({
  body,
  issues,
}: IFormatValidationErrorsArgs): IErrorPayloadItem[] {
  return issues.map((issue) => {
    const key = issue.message as keyof typeof ERROR_DEFINITIONS;

    return {
      code:
        ERROR_DEFINITIONS[key]?.code || ERROR_DEFINITIONS.UNKNOWN_ERROR.code,
      id: ERROR_DEFINITIONS[key]?.id || ERROR_DEFINITIONS.UNKNOWN_ERROR.id,
      description:
        ERROR_DEFINITIONS[key]?.description ||
        ERROR_DEFINITIONS.UNKNOWN_ERROR.description,
      data: body[issue.path[0]] ? [body[issue.path[0]]] : [],
    };
  });
}
