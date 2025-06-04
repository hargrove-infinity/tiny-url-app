import bcrypt from "bcrypt";
import { pinoLogger } from "@src/logger";
import { AppErrorService } from "../AppErrorService";
import { asyncTryCatch } from "../asyncTryCatch";
import {
  CompareHashResult,
  HashStringResult,
  ICompareHashArgs,
  IHashStringArgs,
} from "./types";

async function hashString({
  stringToHash,
  saltRounds = 10,
}: IHashStringArgs): HashStringResult {
  const res = bcrypt.hash(stringToHash, saltRounds);
  pinoLogger.info("Hashing string");
  const [data, error] = await asyncTryCatch<string, Error>(res);

  if (error) {
    pinoLogger.error({ error: error.message }, "Error during hashing string");
    return [, AppErrorService.Encryption.errorDuringHashingString()];
  }

  pinoLogger.info("String successfully hashed");
  return [data, undefined];
}

async function compareHash({
  plainString,
  encryptedString,
}: ICompareHashArgs): CompareHashResult {
  const res = bcrypt.compare(plainString, encryptedString);
  pinoLogger.info("Comparing plain string and encrypted string");
  const [data, error] = await asyncTryCatch<boolean, Error>(res);

  if (error) {
    pinoLogger.error(
      { error: error.message },
      "Error during comparing plain string and encrypted string"
    );
    return [, AppErrorService.Encryption.errorDuringComparingHash()];
  }

  pinoLogger.info("Plain string and encrypted string successfully compared");
  return [data, undefined];
}

export const Encryption = {
  hashString,
  compareHash,
} as const;
