import jwt, { TokenExpiredError } from "jsonwebtoken";
import { ENV } from "@src/common";
import { AppErrorService } from "../AppErrorService";
import {
  ISignTokenArgs,
  SignTokenResult,
  VerifyAuthTokenResult,
} from "./types";
import { verifyDecodedAuthToken } from "./helpers";

function signToken({ payload, expiresIn }: ISignTokenArgs): SignTokenResult {
  try {
    const token = jwt.sign(payload, ENV.JwtSecretKey, {
      algorithm: "HS256",
      expiresIn,
    });

    return [token, null];
  } catch (error) {
    return [null, AppErrorService.Jwt.errorDuringSigningToken()];
  }
}

function verifyAuthToken(token: string): VerifyAuthTokenResult {
  try {
    const decodedToken = jwt.verify(token, ENV.JwtSecretKey);
    const checkResult = verifyDecodedAuthToken(decodedToken);

    if (!checkResult) {
      return [null, AppErrorService.Jwt.verifiedAuthTokenWrongShape()];
    }

    return [decodedToken, null];
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return [null, AppErrorService.Jwt.authTokenExpired()];
    }

    return [null, AppErrorService.Jwt.errorDuringVerificationAuthToken()];
  }
}

export const Jwt = {
  signToken,
  verifyAuthToken,
} as const;
