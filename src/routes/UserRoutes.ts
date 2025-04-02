import { Response } from "express";
import { ApplicationError, HttpStatusCodes, USERS } from "@src/common";
import { AddUserRequest } from "@src/types";
import { UserService } from "@src/services";

/**
 * Add one user.
 */
async function add(req: AddUserRequest, res: Response): Promise<void> {
  try {
    const { body } = req;
    const [user, error] = await UserService.add(body);

    if (error) {
      res.status(error.httpStatusCode).send({ error });
      return;
    }

    res.status(HttpStatusCodes.CREATED).send(user);
  } catch (error) {
    if (error instanceof ApplicationError) {
      res.status(HttpStatusCodes.BAD_REQUEST).send({ error });
      return;
    }

    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
      error: USERS.ERROR_CODES.UNKNOWN_ROUTE_ERROR_FOR_CREATING_USER,
    });
  }
}

export const UserRoutes = { add } as const;
