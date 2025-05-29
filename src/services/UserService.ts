import { UserRepo } from "@src/repos";
import {
  CreateUserResult,
  IAddUserBody,
  ILoginUserBody,
  LoginUserServiceResult,
} from "@src/types";
import { Encryption, AppErrorService, Jwt, prisma } from "@src/util";

/**
 * Add one user.
 */
async function add(userDto: IAddUserBody): CreateUserResult {
  try {
    const [firstUser, errorGetUser] = await UserRepo.getFirst({
      prisma,
      args: { where: { username: userDto.username } },
    });

    if (errorGetUser) {
      return [
        null,
        AppErrorService.Common.reThrowApplicationError(errorGetUser),
      ];
    }

    if (firstUser) {
      return [
        null,
        AppErrorService.Users.userWithEmailAlreadyExists([firstUser.username]),
      ];
    }

    const [hashedPassword, errorHashPassword] = await Encryption.hashString({
      stringToHash: userDto.password,
    });

    if (errorHashPassword) {
      return [
        null,
        AppErrorService.Common.reThrowApplicationError(errorHashPassword),
      ];
    }

    const [createdUser, errorAddUser] = await UserRepo.add({
      prisma,
      args: { data: { ...userDto, password: hashedPassword } },
    });

    if (errorAddUser) {
      return [
        null,
        AppErrorService.Common.reThrowApplicationError(errorAddUser),
      ];
    }

    return [createdUser, null];
  } catch (error) {
    return [null, AppErrorService.Users.unknownServiceErrorForCreatingUser()];
  }
}

/**
 * Login user.
 */
async function login(loginUserDto: ILoginUserBody): LoginUserServiceResult {
  try {
    const [firstUser, errorGetUser] = await UserRepo.getFirst({
      prisma,
      args: {
        where: { username: loginUserDto.username },
        omit: { password: false },
      },
    });

    if (errorGetUser) {
      return [
        null,
        AppErrorService.Common.reThrowApplicationError(errorGetUser),
      ];
    }

    if (!firstUser) {
      return [
        null,
        AppErrorService.Users.userUnauthorized([loginUserDto.username]),
      ];
    }

    const [isPasswordMatch, errorPassword] = await Encryption.compareHash({
      plainString: loginUserDto.password,
      encryptedString: firstUser.password,
    });

    if (errorPassword) {
      return [
        null,
        AppErrorService.Common.reThrowApplicationError(errorPassword),
      ];
    }

    if (!isPasswordMatch) {
      return [null, AppErrorService.Users.loginFailed()];
    }

    const [token, errorToken] = Jwt.signToken({
      id: firstUser.id,
      name: firstUser.name,
      username: firstUser.username,
    });

    if (errorToken) {
      return [null, AppErrorService.Common.reThrowApplicationError(errorToken)];
    }

    return [token, null];
  } catch (error) {
    return [null, AppErrorService.Users.unknownServiceErrorLoginUser()];
  }
}

export const UserService = { add, login } as const;
