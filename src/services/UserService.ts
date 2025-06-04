import { User } from "@prisma/client";
import { UserRepo } from "@src/repos";
import { AsyncTryCatchReturn, IAddUserBody, ILoginUserBody } from "@src/types";
import { Encryption, AppErrorService, Jwt, prisma } from "@src/util";
import { pinoLogger } from "@src/logger";
import { ApplicationError } from "@src/common";

/**
 * Add one user.
 */
async function add(
  userDto: IAddUserBody
): AsyncTryCatchReturn<User, ApplicationError> {
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

  const [createdUser, errorAddUser] = await UserRepo.add({
    prisma,
    args: { data: { ...userDto, password: hashedPassword } },
  });

  if (errorAddUser) {
    pinoLogger.warn(
      { message: errorAddUser.message },
      "Error during creating user in add UserService"
    );

    return [, AppErrorService.Common.internalServerError()];
  }

  return [createdUser, undefined];
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
    id: firstUser.id,
    name: firstUser.name,
    username: firstUser.username,
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

export const UserService = { add, login } as const;
