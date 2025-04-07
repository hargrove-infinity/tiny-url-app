import jwt, { TokenExpiredError } from "jsonwebtoken";
import { ENV } from "@src/common";
import { ErrorHandler } from "../errorHandler";
import { ISignTokenPayload, SignTokenResult, VerifyTokenResult } from "./types";
import { verifyDecodedToken } from "./helpers";

function signToken(payload: ISignTokenPayload): SignTokenResult {
  try {
    const token = jwt.sign(payload, ENV.JwtSecretKey, {
      algorithm: "HS256",
      expiresIn: "3h",
    });

    return [token, null];
  } catch (error) {
    return [null, ErrorHandler.Jwt.errorDuringSigningToken()];
  }
}

function verifyToken(token: string): VerifyTokenResult {
  try {
    const decodedToken = jwt.verify(token, ENV.JwtSecretKey);
    const checkResult = verifyDecodedToken(decodedToken);

    if (!checkResult) {
      return [null, ErrorHandler.Jwt.verifiedTokenWrongShape()];
    }

    return [decodedToken, null];
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return [null, ErrorHandler.Jwt.tokenExpired()];
    }

    return [null, ErrorHandler.Jwt.errorDuringVerificationToken()];
  }
}

export const Jwt = {
  signToken,
  verifyToken,
} as const;
