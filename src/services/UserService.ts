import { UserRepo } from "@src/repos";
import {
  CreateUserServiceResult,
  IAddUserBody,
  ILoginUserBody,
  LoginUserServiceResult,
} from "@src/types";
import { Encryption, ErrorHandler, Jwt, prisma } from "@src/util";

/**
 * Add one user.
 */
async function add(userDto: IAddUserBody): CreateUserServiceResult {
  try {
    const [firstUser, errorGetUser] = await UserRepo.getFirst({
      prisma,
      args: { where: { username: userDto.username } },
    });

    if (errorGetUser) {
      return [null, ErrorHandler.Common.reThrowApplicationError(errorGetUser)];
    }

    if (firstUser) {
      return [
        null,
        ErrorHandler.Users.userWithEmailAlreadyExists([firstUser.username]),
      ];
    }

    const [hashedPassword, errorHashPassword] = await Encryption.hashString({
      stringToHash: userDto.password,
    });

    if (errorHashPassword) {
      return [
        null,
        ErrorHandler.Common.reThrowApplicationError(errorHashPassword),
      ];
    }

    const [createdUser, errorAddUser] = await UserRepo.add({
      prisma,
      data: { ...userDto, password: hashedPassword },
    });

    if (errorAddUser) {
      return [null, ErrorHandler.Common.reThrowApplicationError(errorAddUser)];
    }

    return [createdUser, null];
  } catch (error) {
    return [null, ErrorHandler.Users.unknownServiceErrorForCreatingUser()];
  }
}

/**
 * Login user.
 */
async function login(loginUserDto: ILoginUserBody): LoginUserServiceResult {
  try {
    const [firstUser, errorGetUser] = await UserRepo.getFirst({
      prisma,
      args: { where: { username: loginUserDto.username } },
    });

    if (errorGetUser) {
      return [null, ErrorHandler.Common.reThrowApplicationError(errorGetUser)];
    }

    if (!firstUser) {
      return [
        null,
        ErrorHandler.Users.userWithEmailNotFound([loginUserDto.username]),
      ];
    }

    const [isPasswordMatch, errorPassword] = await Encryption.compareHash({
      plainString: loginUserDto.password,
      encryptedString: firstUser.password,
    });

    if (errorPassword) {
      return [null, ErrorHandler.Common.reThrowApplicationError(errorPassword)];
    }

    if (!isPasswordMatch) {
      return [null, ErrorHandler.Users.passwordWrong()];
    }

    const [token, errorToken] = Jwt.signToken({
      id: firstUser.id,
      name: firstUser.name,
      username: firstUser.username,
    });

    if (errorToken) {
      return [null, ErrorHandler.Common.reThrowApplicationError(errorToken)];
    }

    return [token, null];
  } catch (error) {
    return [null, ErrorHandler.Users.unknownServiceErrorLoginUser()];
  }
}

export const UserService = { add, login } as const;
