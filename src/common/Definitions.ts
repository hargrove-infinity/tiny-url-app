/******************************************************************************
                              Constants
******************************************************************************/

export const PASSWORD_MIN_LENGTH = 8;

// At least one upper letter, at least one lower letter, at least one number, any length
export const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[\s\S]+$/;

export const DEFAULT_SHORT_URL_LENGTH = 7;

// Only capital letters or lower letters or number or dash or underscore
export const SHORT_URL_REGEXP = /^[A-Za-z0-9_-]+$/;

/******************************************************************************
                              Enums
******************************************************************************/

export enum NodeEnvs {
  Dev = "development",
  Test = "test",
  Production = "production",
}
