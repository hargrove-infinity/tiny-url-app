import { UserRepo } from "@src/repos";
import { CreateUserServiceResult, IAddUserBody } from "@src/types";
import { Encryption, ErrorHandler, prisma } from "@src/util";

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
      return [null, ErrorHandler.Users.userWithEmailAlreadyExists()];
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

export const UserService = { add } as const;
