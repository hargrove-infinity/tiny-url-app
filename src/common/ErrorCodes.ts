import { DEFAULT_SHORT_URL_LENGTH, PASSWORD_MIN_LENGTH } from "./Definitions";

const ERROR_DEFINITIONS_MISC = {
  UNKNOWN_ERROR: {
    code: "UNKNOWN_ERROR",
    id: "00000",
    description: "Unknown error",
  },
  ROUTE_NOT_FOUND: {
    code: "ROUTE_NOT_FOUND",
    id: "00001",
    description: "Url not found",
  },
  UNHANDLED_ERROR: {
    code: "UNHANDLED_ERROR",
    id: "00002",
    description: "Error that is not handled by any repo, service, route",
  },
};

const ERROR_DEFINITIONS_ENCRYPTION = {
  ERROR_HASHING_STRING: {
    code: "ERROR_HASHING_STRING",
    id: "00003",
    description: "Error during hashing string",
    message: "Error during hashing string (hashString util function)",
  },
  ERROR_COMPARING_HASH: {
    code: "ERROR_COMPARING_HASH",
    id: "00004",
    description: "Error during comparing plain text with hash",
    message:
      "Error during comparing plain text with hash (compareHash util function)",
  },
};

const ERROR_DEFINITIONS_JWT = {
  ERROR_SIGNING_TOKEN: {
    code: "ERROR_SIGNING_TOKEN",
    id: "00005",
    description: "Error during signing token",
    message: "Error during signing token (signToken util function)",
  },
  ERROR_VERIFICATION_TOKEN: {
    code: "ERROR_VERIFICATION_TOKEN",
    id: "00006",
    description: "Error during verification token",
    message: "Error during verification token (verifyToken util function)",
  },
  TOKEN_EXPIRED: {
    code: "TOKEN_EXPIRED",
    id: "00007",
    description: "Token is expired",
    message:
      "Token is expired (verifyToken util function; error instanceof TokenExpiredError)",
  },
  VERIFIED_TOKEN_WRONG_SHAPE: {
    code: "VERIFIED_TOKEN_WRONG_SHAPE",
    id: "00008",
    description:
      "Verified token is not an object or does not have needed fields or fields are wrong type",
    message:
      "Verified token is not an object or does not have needed fields or fields are wrong type (verifyToken util function; try block)",
  },
};

const ERROR_DEFINITIONS_TOKEN = {
  AUTHORIZATION_TOKEN_MISSING: {
    code: "AUTHORIZATION_TOKEN_MISSING",
    id: "00009",
    description: "Authorization token is not provided",
  },
  AUTHORIZATION_TOKEN_WRONG_FORMAT: {
    code: "AUTHORIZATION_TOKEN_WRONG_FORMAT",
    id: "00010",
    description: "Authorization has wrong format",
  },
};

const ERROR_DEFINITIONS_USERS = {
  NAME_USER_MUST_BE_STRING: {
    code: "NAME_USER_MUST_BE_STRING",
    id: "00011",
    description: "User name must be type string",
  },
  NAME_USER_MUST_BE_FILLED: {
    code: "NAME_USER_MUST_BE_FILLED",
    id: "00012",
    description: "User name must be filled",
  },
  EMAIL_USER_MUST_BE_STRING: {
    code: "EMAIL_USER_MUST_BE_STRING",
    id: "00013",
    description: "User email must be string",
  },
  EMAIL_USER_MUST_BE_FILLED: {
    code: "EMAIL_USER_MUST_BE_FILLED",
    id: "00014",
    description: "User email must be filled",
  },
  INVALID_EMAIL: {
    code: "INVALID_EMAIL",
    id: "00015",
    description: "Email is invalid",
  },
  PASSWORD_MUST_BE_STRING: {
    code: "PASSWORD_MUST_BE_STRING",
    id: "00016",
    description: "Password must be string",
  },
  PASSWORD_MIN_LENGTH_REQUIREMENT: {
    code: "PASSWORD_MIN_LENGTH_REQUIREMENT",
    id: "00017",
    description: `Password must be ${PASSWORD_MIN_LENGTH} characters length`,
  },
  PASSWORD_PATTERN: {
    code: "PASSWORD_PATTERN",
    id: "00018",
    description:
      "Password must contain at least one upper letter, at least one lower letter, at least one number",
  },
  GET_FIRST_USER_DATABASE_ERROR: {
    code: "GET_FIRST_USER_DATABASE_ERROR",
    id: "00019",
    description: "Error during fetching first user from database",
    message:
      "Error during fetching first user from database (getFirst UserRepo)",
  },
  GET_UNIQUE_USER_DATABASE_ERROR: {
    code: "GET_UNIQUE_USER_DATABASE_ERROR",
    id: "00020",
    description: "Error during fetching unique user from database",
    message:
      "Error during fetching unique user from database (getUnique UserRepo)",
  },
  CREATE_USER_DATABASE_ERROR: {
    code: "CREATE_USER_DATABASE_ERROR",
    id: "00021",
    description: "Error during creation user in database",
    message: "Error during creation user in database (add UserRepo)",
  },
  USER_WITH_EMAIL_ALREADY_EXISTS: {
    code: "USER_WITH_EMAIL_ALREADY_EXISTS",
    id: "00022",
    description: "User with provided email already exists",
    message: "User with provided email already exists (add UserService)",
  },
  UNKNOWN_SERVICE_ERROR_CREATION_USER: {
    code: "UNKNOWN_SERVICE_ERROR_CREATION_USER",
    id: "00023",
    description: "Unknown error in creation user service",
    message:
      "Unknown error in creation user service (add UserService, catch block)",
  },
  UNKNOWN_ROUTE_ERROR_CREATION_USER: {
    code: "UNKNOWN_ROUTE_ERROR_CREATION_USER",
    id: "00024",
    description: "Unknown error in creation user route",
  },
  CREATE_LINK_DATABASE_ERROR: {
    code: "CREATE_LINK_DATABASE_ERROR",
    id: "00025",
    description: "Error during creation link in database",
    message: "Error during creation link in database (add LinkRepo)",
  },
  GET_FIRST_LINK_DATABASE_ERROR: {
    code: "GET_FIRST_LINK_DATABASE_ERROR",
    id: "00026",
    description: "Error during get first link in database",
    message: "Error during get first link in database (getFirst LinkRepo)",
  },
  UNKNOWN_ROUTE_ERROR_LOGIN_USER: {
    code: "UNKNOWN_ROUTE_ERROR_LOGIN_USER",
    id: "00027",
    description: "Unknown error in login user route",
  },
  UNKNOWN_SERVICE_ERROR_LOGIN_USER: {
    code: "UNKNOWN_SERVICE_ERROR_LOGIN_USER",
    id: "00028",
    description: "Unknown error in login user service",
    message:
      "Unknown error in login user service (login UserService catch block)",
  },
  USER_UNAUTHORIZED: {
    code: "USER_UNAUTHORIZED",
    id: "00029",
    description: "User is not authorized",
    message:
      "User is not authorized (login UserService / checkAuth middleware)",
  },
  USER_MISSING_REQUEST_DATA: {
    code: "USER_MISSING_REQUEST_DATA",
    id: "00030",
    description: "User field is missing in the express request object",
  },
  LOGIN_FAILED: {
    code: "LOGIN_FAILED",
    id: "00031",
    description: "Login failed: Invalid username or password.",
    message: "Login failed: Invalid username or password. (login UserService)",
  },
};

const ERROR_DEFINITIONS_LINKS = {
  SHORT_URL_MUST_BE_STRING: {
    code: "SHORT_URL_MUST_BE_STRING",
    id: "00032",
    description: "Short url must be string",
  },
  SHORT_URL_DEFINED_LENGTH: {
    code: "SHORT_URL_DEFINED_LENGTH",
    id: "00033",
    description: `Short url must be ${DEFAULT_SHORT_URL_LENGTH} characters length`,
  },
  SHORT_URL_PATTERN: {
    code: "SHORT_URL_PATTERN",
    id: "00034",
    description:
      "Only capital letters or lower letters or number or dash or underscore",
  },
  URL_FOR_CONVERTING_NOT_PROVIDED: {
    code: "URL_FOR_CONVERTING_NOT_PROVIDED",
    id: "00035",
    description: "Url was not provided for the converting",
    message: "Url was not provided for the converting (addOne LinkService)",
  },
  UNKNOWN_SERVICE_ERROR_CREATION_LINK: {
    code: "UNKNOWN_SERVICE_ERROR_CREATION_LINK",
    id: "00036",
    description: "Unknown error in service for creation link",
    message:
      "Unknown error in service for creation link (addOne LinkService catch block)",
  },
  SHORT_URL_FOR_REDIRECTING_NOT_PROVIDED: {
    code: "SHORT_URL_FOR_REDIRECTING_NOT_PROVIDED",
    id: "00037",
    description: "Short url was not provided for the redirecting",
    message:
      "Short url was not provided for the redirecting (redirectToUrl LinkService)",
  },
  SHORT_URL_FOR_REDIRECTING_NOT_FOUND_DATABASE: {
    code: "SHORT_URL_FOR_REDIRECTING_NOT_FOUND_DATABASE",
    id: "00038",
    description: "Short url was not found in database",
    message: "Short url was not found in database (redirectToUrl LinkService)",
  },
  UNKNOWN_SERVICE_ERROR_REDIRECT_LINK: {
    code: "UNKNOWN_SERVICE_ERROR_REDIRECT_LINK",
    id: "00039",
    description: "Unknown error in service for redirecting link",
    message:
      "Unknown error in service for redirecting link (redirectToUrl LinkService catch block)",
  },
  UNKNOWN_ROUTE_ERROR_CREATION_LINK: {
    code: "UNKNOWN_ROUTE_ERROR_CREATION_LINK",
    id: "00040",
    description: "Unknown error in route for creation link",
  },
  UNKNOWN_ROUTE_ERROR_REDIRECT_URL: {
    code: "UNKNOWN_ROUTE_ERROR_REDIRECT_URL",
    id: "00041",
    description: "Unknown error in route for redirect url",
  },
  URL_MUST_BE_STRING: {
    code: "URL_MUST_BE_STRING",
    id: "00042",
    description: "Url must be string",
  },
  URL_PATTERN: {
    code: "URL_PATTERN",
    id: "00043",
    description: "String is not valid url",
  },
};

export const ERROR_DEFINITIONS = {
  ...ERROR_DEFINITIONS_MISC,
  ...ERROR_DEFINITIONS_ENCRYPTION,
  ...ERROR_DEFINITIONS_JWT,
  ...ERROR_DEFINITIONS_TOKEN,
  ...ERROR_DEFINITIONS_USERS,
  ...ERROR_DEFINITIONS_LINKS,
};
