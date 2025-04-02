import bcrypt from "bcrypt";
import { ErrorHandler } from "../errorHandler";
import { HashStringResult, ICompareHashArgs, IHashStringArgs } from "./types";

async function hashString({
  stringToHash,
  saltRounds = 10,
}: IHashStringArgs): HashStringResult {
  try {
    const hashedString = await bcrypt.hash(stringToHash, saltRounds);
    return [hashedString, null];
  } catch (error) {
    return [null, ErrorHandler.Encryption.errorDuringHashingString()];
  }
}

async function compareHash({ plainString, encryptedString }: ICompareHashArgs) {
  try {
    const result = await bcrypt.compare(plainString, encryptedString);
    return [result, null];
  } catch (error) {
    return [null, ErrorHandler.Encryption.errorDuringComparingHash()];
  }
}

export const Encryption = {
  hashString,
  compareHash,
} as const;
