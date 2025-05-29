import { Response } from "express";
import { UserService } from "@src/services";
import { ApplicationError, HttpStatusCodes } from "@src/common";
import { AddUserRequest, LoginUserRequest } from "@src/types";
import { ClientErrorService } from "@src/util";

/**
 * Add one user.
 */
async function add(req: AddUserRequest, res: Response): Promise<void> {
  try {
    const { body } = req;
    const [user, error] = await UserService.add(body);

    if (error) {
      res
        .status(error.httpStatusCode)
        .send({ errors: error.buildErrorPayload() });
      return;
    }

    res.status(HttpStatusCodes.CREATED).send(user);
  } catch (error) {
    if (error instanceof ApplicationError) {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .send({ errors: error.buildErrorPayload() });
      return;
    }

    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
      errors: ClientErrorService.Users.unknownRouteErrorForCreatingUser(),
    });
  }
}

/**
 * Login user.
 */
async function login(req: LoginUserRequest, res: Response): Promise<void> {
  try {
    const { body } = req;
    const [token, error] = await UserService.login(body);

    if (error) {
      res
        .status(error.httpStatusCode)
        .send({ errors: error.buildErrorPayload() });
      return;
    }

    res.status(HttpStatusCodes.OK).send(token);
  } catch (error) {
    if (error instanceof ApplicationError) {
      res
        .status(HttpStatusCodes.BAD_REQUEST)
        .send({ errors: error.buildErrorPayload() });
      return;
    }

    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
      errors: ClientErrorService.Users.unknownRouteErrorForLoginUser(),
    });
  }
}

/******************************************************************************
                                Export
******************************************************************************/

export const UserRoutes = { add, login } as const;
