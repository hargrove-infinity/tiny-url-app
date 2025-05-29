/******************************************************************************
                              Constants
******************************************************************************/

export const PASSWORD_MIN_LENGTH = 8;

// At least one upper letter, at least one lower letter, at least one number, any length
export const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[\s\S]+$/;

export const DEFAULT_SHORT_URL_LENGTH = 7;

// Only capital letters or lower letters or number or dash or underscore
export const SHORT_URL_REGEXP = /^[A-Za-z0-9_-]+$/;

export const UNCAUGHT_EXCEPTION_MESSAGE =
  "Uncaught Exception - application will exit";

export const UNHANDLED_REJECTION_MESSAGE =
  "Unhandled Rejection - application will exit";

export const DATABASE_CONNECTED_SUCCESSFULLY_MESSAGE =
  "✅ Database connection successful";

export const DATABASE_CONNECTION_FAILED_MESSAGE =
  "❌ Failed to connect to database. Exiting.";

/******************************************************************************
                              Enums
******************************************************************************/

export enum NodeEnvs {
  Dev = "development",
  Test = "test",
  Production = "production",
}
