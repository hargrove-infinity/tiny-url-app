import jwt from "jsonwebtoken";
import { ENV } from "@src/common";
import { ErrorHandler } from "../errorHandler";
import { ISignTokenPayload, SignTokenResult, VerifyTokenResult } from "./types";

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
    const result = jwt.verify(token, ENV.JwtSecretKey);
    return [result, null];
  } catch (error) {
    return [null, ErrorHandler.Jwt.errorDuringVerificationToken()];
  }
}

export const Jwt = {
  signToken,
  verifyToken,
} as const;
