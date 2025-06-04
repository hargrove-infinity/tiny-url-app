import { ApplicationError } from "@src/common";

export interface IHashStringArgs {
  stringToHash: string;
  saltRounds?: number;
}

export interface ICompareHashArgs {
  plainString: string;
  encryptedString: string;
}

export type HashStringResult = Promise<
  [string, undefined] | [undefined, ApplicationError]
>;

export type CompareHashResult = Promise<
  [boolean, undefined] | [undefined, ApplicationError]
>;
