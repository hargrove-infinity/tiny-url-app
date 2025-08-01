import { User } from "@prisma/client";
import { StringValue } from "ms";
import { UserRepo } from "@src/repos";
import {
  AsyncTryCatchReturn,
  IRequestSignUpBody,
  ICompleteSignUpBody,
  ILoginUserBody,
} from "@src/types";
import {
  transporter,
  Encryption,
  AppErrorService,
  Jwt,
  prisma,
  sendSignUpLinkEmail,
  buildSignUpLink,
  retry,
} from "@src/util";
import { pinoLogger } from "@src/logger";
import { ApplicationError, ENV } from "@src/common";

/**
 * Request sign up.
 */
async function requestSignUp(
  requestSignUpDto: IRequestSignUpBody
): AsyncTryCatchReturn<Record<string, never>, ApplicationError> {
  const [firstUser, errorGetUser] = await UserRepo.getFirst({
    prisma,
    args: { where: { username: requestSignUpDto.username } },
  });

  if (errorGetUser) {
    pinoLogger.warn(
      { message: errorGetUser.message },
      "Error during fetching first user in requestSignUp UserService"
    );
    return [, AppErrorService.Common.internalServerError()];
  }

  if (firstUser) {
    pinoLogger.warn(
      "User with email already exists (requestSignUp UserService)"
    );
    return [, AppErrorService.Users.registrationFailed()];
  }

  const [signUpToken, errorToken] = Jwt.signToken({
    payload: requestSignUpDto,
    expiresIn: ENV.EXPIRATION_TIME_SIGN_UP_TOKEN as StringValue,
  });

  if (errorToken) {
    pinoLogger.warn(
      { message: errorToken.message },
      "Error during creating sign up token in requestSignUp UserService"
    );

    return [, errorToken];
  }

  const signUpLink = buildSignUpLink(signUpToken);

  const sendSignUpLinkEmailAction = () =>
    sendSignUpLinkEmail({
      transporter,
      toEmails: [requestSignUpDto.username],
      context: { userName: `${requestSignUpDto.name}`, signUpLink },
    });

  const retriedSendSignUpLinkEmail = retry(sendSignUpLinkEmailAction);

  const [, errorSendSignUpLinkEmail] = await retriedSendSignUpLinkEmail();

  if (errorSendSignUpLinkEmail) {
    pinoLogger.warn(
      { message: errorSendSignUpLinkEmail.message },
      "Error during sending sign up link email template in requestSignUp UserService"
    );
    return [, AppErrorService.Common.internalServerError()];
  }

  return [{}, undefined];
}

/**
 * Complete sign up.
 */
async function completeSignUp(
  completeSignUpDto: ICompleteSignUpBody
): AsyncTryCatchReturn<string, ApplicationError> {
  const { password, signUpToken } = completeSignUpDto;
  const [result, errorSignUpToken] = Jwt.verifySignUpToken(signUpToken);

  if (errorSignUpToken) {
    pinoLogger.warn(
      { message: errorSignUpToken.message },
      "Error during decoding sign up token in completeSignUp UserService"
    );
    return [, AppErrorService.Common.internalServerError()];
  }

  const { iat, exp, ...user } = result;

  const [hashedPassword, errorHashPassword] = await Encryption.hashString({
    stringToHash: password,
  });

  if (errorHashPassword) {
    pinoLogger.warn(
      { message: errorHashPassword.message },
      "Error during hashing password in completeSignUp UserService"
    );
    return [, AppErrorService.Common.internalServerError()];
  }

  const [createdUser, errorCreatedUser]:
    | [User, undefined]
    | [undefined, ApplicationError] = await prisma.$transaction(async (db) => {
    const [firstUser, errorGetUser] = await UserRepo.getFirst({
      prisma: db,
      args: { where: { username: user.username } },
    });

    if (errorGetUser) {
      pinoLogger.warn(
        { message: errorGetUser.message },
        "Error during fetching first user in completeSignUp UserService"
      );
      return [, AppErrorService.Common.internalServerError()];
    }

    if (firstUser) {
      pinoLogger.warn(
        "User with email already exists (completeSignUp UserService)"
      );
      return [, AppErrorService.Users.registrationFailed()];
    }

    const [createdUser, errorAddUser] = await UserRepo.add({
      prisma: db,
      args: { data: { ...user, password: hashedPassword } },
    });

    if (errorAddUser) {
      pinoLogger.warn(
        { message: errorAddUser.message },
        "Error during creating user in completeSignUp UserService"
      );
      return [, AppErrorService.Common.internalServerError()];
    }

    return [createdUser, undefined];
  });

  if (errorCreatedUser) {
    return [, errorCreatedUser];
  }

  const [token, errorToken] = Jwt.signToken({
    payload: {
      id: createdUser.id,
      name: createdUser.name,
      username: createdUser.username,
    },
    expiresIn: ENV.EXPIRATION_TIME_AUTH_TOKEN as StringValue,
  });

  if (errorToken) {
    pinoLogger.warn(
      { message: errorToken.message },
      "Error during signing token in completeSignUp UserService"
    );

    return [, errorToken];
  }

  return [token, undefined];
}

/**
 * Login user.
 */
async function login(
  loginUserDto: ILoginUserBody
): AsyncTryCatchReturn<string, ApplicationError> {
  const [firstUser, errorGetUser] = await UserRepo.getFirst({
    prisma,
    args: {
      where: { username: loginUserDto.username },
      omit: { password: false },
    },
  });

  if (errorGetUser) {
    pinoLogger.warn(
      { message: errorGetUser.message },
      "Error during fetching first user in login UserService"
    );

    return [, AppErrorService.Common.internalServerError()];
  }

  if (!firstUser) {
    pinoLogger.warn("User is not found in login UserService");
    return [, AppErrorService.Users.userUnauthorized([loginUserDto.username])];
  }

  const [isPasswordMatch, errorPassword] = await Encryption.compareHash({
    plainString: loginUserDto.password,
    encryptedString: firstUser.password,
  });

  if (errorPassword) {
    pinoLogger.warn(
      { message: errorPassword.message },
      "Error during comparing passwords in login UserService"
    );

    return [, AppErrorService.Common.internalServerError()];
  }

  if (!isPasswordMatch) {
    pinoLogger.warn("Passwords are not matched in login UserService");
    return [, AppErrorService.Users.loginFailed()];
  }

  const [token, errorToken] = Jwt.signToken({
    payload: {
      id: firstUser.id,
      name: firstUser.name,
      username: firstUser.username,
    },
    expiresIn: ENV.EXPIRATION_TIME_AUTH_TOKEN as StringValue,
  });

  if (errorToken) {
    pinoLogger.warn(
      { message: errorToken.message },
      "Error during signing token in login UserService"
    );

    return [, errorToken];
  }

  return [token, undefined];
}

export const UserService = {
  requestSignUp,
  completeSignUp,
  login,
} as const;
