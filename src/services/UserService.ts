import { UserRepo } from "@src/repos";
import { AsyncTryCatchReturn, IAddUserBody, ILoginUserBody } from "@src/types";
import {
  transporter,
  Encryption,
  AppErrorService,
  Jwt,
  prisma,
  sendEmailConfirm,
  buildActivationLink,
} from "@src/util";
import { pinoLogger } from "@src/logger";
import { ApplicationError } from "@src/common";

/**
 * Add one user.
 */
async function add(
  userDto: IAddUserBody
): AsyncTryCatchReturn<Record<string, never>, ApplicationError> {
  const [firstUser, errorGetUser] = await UserRepo.getFirst({
    prisma,
    args: { where: { username: userDto.username } },
  });

  if (errorGetUser) {
    pinoLogger.warn(
      { message: errorGetUser.message },
      "Error during fetching first user in add UserService"
    );
    return [, AppErrorService.Common.internalServerError()];
  }

  if (firstUser) {
    pinoLogger.warn("User with email already exists (add UserService)");
    return [, AppErrorService.Users.registrationFailed()];
  }

  const [hashedPassword, errorHashPassword] = await Encryption.hashString({
    stringToHash: userDto.password,
  });

  if (errorHashPassword) {
    pinoLogger.warn(
      { message: errorHashPassword.message },
      "Error during hashing password in add UserService"
    );
    return [, AppErrorService.Common.internalServerError()];
  }

  const [emailVerificationToken, errorToken] = Jwt.signToken({
    payload: { ...userDto, password: hashedPassword },
    expiresIn: "30Minutes",
  });

  if (errorToken) {
    pinoLogger.warn(
      { message: errorToken.message },
      "Error during creating email verification token in add UserService"
    );

    return [, errorToken];
  }

  const activationLink = buildActivationLink(emailVerificationToken);

  const [, errorSendEmailConfirm] = await sendEmailConfirm({
    transporter,
    toEmails: [userDto.username],
    context: { userName: `${userDto.name}`, activationLink },
  });

  if (errorSendEmailConfirm) {
    pinoLogger.warn(
      { message: errorSendEmailConfirm.message },
      "Error during sending email confirmation template in add UserService"
    );
    return [, AppErrorService.Common.internalServerError()];
  }

  return [{}, undefined];
}

/**
 * Email verification.
 */
async function emailVerification(
  hash: string
): AsyncTryCatchReturn<Record<string, never>, ApplicationError> {
  const [result, errorEmailVerificationToken] =
    Jwt.verifyEmailVerificationToken(hash);

  if (errorEmailVerificationToken) {
    pinoLogger.warn(
      { message: errorEmailVerificationToken.message },
      "Error during decoding hash in emailVerification UserService"
    );
    return [, AppErrorService.Common.internalServerError()];
  }

  const { iat, exp, ...user } = result;

  const [firstUser, errorGetUser] = await UserRepo.getFirst({
    prisma,
    args: { where: { username: user.username } },
  });

  if (errorGetUser) {
    pinoLogger.warn(
      { message: errorGetUser.message },
      "Error during fetching first user in emailVerification UserService"
    );
    return [, AppErrorService.Common.internalServerError()];
  }

  if (firstUser) {
    pinoLogger.warn(
      "User with email already exists (emailVerification UserService)"
    );
    return [, AppErrorService.Users.registrationFailed()];
  }

  const [, errorAddUser] = await UserRepo.add({
    prisma,
    args: { data: user },
  });

  if (errorAddUser) {
    pinoLogger.warn(
      { message: errorAddUser.message },
      "Error during creating user in emailVerification UserService"
    );

    return [, AppErrorService.Common.internalServerError()];
  }

  return [{}, undefined];
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
    expiresIn: "3h",
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

export const UserService = { add, emailVerification, login } as const;
