import jwt, { TokenExpiredError } from "jsonwebtoken";
import { ENV } from "@src/common";
import {
  DecodedAuthTokenSchema,
  safeParseValidationSchema,
  DecodedEmailVerificationTokenSchema,
  DecodedSignUpTokenSchema,
} from "@src/validation";
import { AppErrorService } from "../AppErrorService";
import {
  ISignTokenArgs,
  SignTokenResult,
  VerifyAuthTokenResult,
  VerifyEmailVerificationTokenResult,
  VerifySignUpTokenResult,
} from "./types";

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

    const validationResult = safeParseValidationSchema({
      schema: DecodedAuthTokenSchema,
      data: decodedToken,
    });

    if (!validationResult) {
      return [null, AppErrorService.Jwt.verifiedAuthTokenWrongShape()];
    }

    return [validationResult, null];
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return [null, AppErrorService.Jwt.authTokenExpired()];
    }

    return [null, AppErrorService.Jwt.errorDuringVerificationAuthToken()];
  }
}

function verifyEmailVerificationToken(
  token: string
): VerifyEmailVerificationTokenResult {
  try {
    const decodedToken = jwt.verify(token, ENV.JwtSecretKey);

    const validationResult = safeParseValidationSchema({
      schema: DecodedEmailVerificationTokenSchema,
      data: decodedToken,
    });

    if (!validationResult) {
      return [
        null,
        AppErrorService.Jwt.verifiedEmailVerificationTokenWrongShape(),
      ];
    }

    return [validationResult, null];
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return [null, AppErrorService.Jwt.emailVerificationTokenExpired()];
    }

    return [
      null,
      AppErrorService.Jwt.errorDuringVerificationEmailVerificationToken(),
    ];
  }
}

function verifySignUpToken(token: string): VerifySignUpTokenResult {
  try {
    const decodedToken = jwt.verify(token, ENV.JwtSecretKey);

    const validationResult = safeParseValidationSchema({
      schema: DecodedSignUpTokenSchema,
      data: decodedToken,
    });

    if (!validationResult) {
      return [null, AppErrorService.Jwt.verifiedSignUpTokenWrongShape()];
    }

    return [validationResult, null];
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return [null, AppErrorService.Jwt.signUpTokenExpired()];
    }

    return [null, AppErrorService.Jwt.errorDuringVerificationSignUpToken()];
  }
}

export const Jwt = {
  signToken,
  verifyAuthToken,
  verifyEmailVerificationToken,
  verifySignUpToken,
} as const;
