import { DEFAULT_SHORT_URL_LENGTH } from "./Constants";

export const LINKS = {
  VALIDATION_MESSAGES: {
    DEFINED_SHORT_URL_LENGTH: `Short URL must be exactly ${DEFAULT_SHORT_URL_LENGTH} characters`,
    SHORT_URL_PATTERN: "Short URL must be a valid string",
  },
  ERROR_MESSAGES: {
    DATABASE_ERROR_LINKS: "DATABASE_ERROR_LINKS",
    SERVICE_ERROR_LINKS: "SERVICE_ERROR_LINKS",
  },
  ERROR_CODES: {
    DATABASE_ERROR_GET_UNIQUE_LINK: "DATABASE_ERROR_GET_UNIQUE_LINK",
    DATABASE_ERROR_ADD_ONE_LINK: "DATABASE_ERROR_ADD_ONE_LINK",
    URL_FOR_CONVERTING_NOT_PROVIDED: "URL_FOR_CONVERTING_NOT_PROVIDED",
    UNKNOWN_SERVICE_ERROR_FOR_CREATING_SHORT_URL:
      "UNKNOWN_SERVICE_ERROR_FOR_CREATING_SHORT_URL",
    ERROR_RETURN_TYPE_ADD_LINK_SERVICE: "ERROR_RETURN_TYPE_ADD_LINK_SERVICE",
    UNKNOWN_ROUTE_ERROR_FOR_CREATING_SHORT_URL:
      "UNKNOWN_ROUTE_ERROR_FOR_CREATING_SHORT_URL",
    SHORT_URL_FOR_REDIRECTING_NOT_PROVIDED:
      "SHORT_URL_FOR_REDIRECTING_NOT_PROVIDED",
    UNKNOWN_SERVICE_ERROR_FOR_REDIRECTING_TO_URL:
      "UNKNOWN_SERVICE_ERROR_FOR_REDIRECTING_TO_URL",
    UNKNOWN_ROUTE_ERROR_FOR_REDIRECTING_TO_URL:
      "UNKNOWN_ROUTE_ERROR_FOR_REDIRECTING_TO_URL",
    ERROR_RETURN_TYPE_REDIRECT_LINK_SERVICE:
      "ERROR_RETURN_TYPE_REDIRECT_LINK_SERVICE",
  },
};

export const DEFAULT_ERROR_MESSAGE = "Something went wrong";

export class ApplicationError extends Error {
  public statusCode: number;
  public errorCode: string;

  constructor(
    message: string,
    options: { statusCode: number; errorCode: string }
  ) {
    super(message);
    this.statusCode = options.statusCode;
    this.errorCode = options.errorCode;
  }

  get httpStatusCode() {
    return this.statusCode;
  }

  get appErrorCode() {
    return this.errorCode;
  }
}
