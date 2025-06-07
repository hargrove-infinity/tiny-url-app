import { Response, Request } from "express";
import { UserService } from "@src/services";
import { HttpStatusCodes } from "@src/common";
import { AddUserRequest, LoginUserRequest } from "@src/types";
import { pinoLogger } from "@src/logger";

/**
 * Add one user.
 */
async function add(req: AddUserRequest, res: Response): Promise<void> {
  const { body } = req;
  const [user, error] = await UserService.add(body);

  if (error) {
    pinoLogger.warn({ error: error.message }, "Error in add user route");

    res
      .status(error.httpStatusCode)
      .send({ errors: error.buildErrorPayload() });
    return;
  }

  pinoLogger.info("Created user is sending to the client");
  res.status(HttpStatusCodes.CREATED).send(user);
}

/**
 * User email verification.
 */
async function emailVerification(req: Request, res: Response) {
  res.send("OK");
}

/**
 * Login user.
 */
async function login(req: LoginUserRequest, res: Response): Promise<void> {
  const { body } = req;
  const [token, error] = await UserService.login(body);

  if (error) {
    pinoLogger.warn({ error: error.message }, "Error in login user route");

    res
      .status(error.httpStatusCode)
      .send({ errors: error.buildErrorPayload() });
    return;
  }

  pinoLogger.info("Token is sending to the client");
  res.status(HttpStatusCodes.OK).send(token);
}

/******************************************************************************
                                Export
******************************************************************************/

export const UserRoutes = { add, emailVerification, login } as const;
