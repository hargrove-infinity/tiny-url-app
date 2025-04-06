import { AsyncOperationResult } from "@src/types";

export interface IHashStringArgs {
  stringToHash: string;
  saltRounds?: number;
}

export interface ICompareHashArgs {
  plainString: string;
  encryptedString: string;
}

export type HashStringResult = AsyncOperationResult<string>;
