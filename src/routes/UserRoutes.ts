import { Response } from "express";
import { UserService } from "@src/services";
import { HttpStatusCodes } from "@src/common";
import {
  AddUserRequest,
  LoginUserRequest,
  CompleteSignUpRequest,
} from "@src/types";
import { pinoLogger } from "@src/logger";

/**
 * Add one user.
 */
async function add(req: AddUserRequest, res: Response): Promise<void> {
  const { body } = req;
  const [data, error] = await UserService.add(body);

  if (error) {
    pinoLogger.warn(
      { error: error.message },
      "Failed to initiate user registration process."
    );

    res
      .status(error.httpStatusCode)
      .send({ errors: error.buildErrorPayload() });
    return;
  }

  pinoLogger.info("User registration initiated. Verification email sent.");
  res.status(HttpStatusCodes.CREATED).send(data);
}

/**
 * Complete sign up.
 */
async function completeSignUp(
  req: CompleteSignUpRequest,
  res: Response
): Promise<void> {
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

export const UserRoutes = {
  add,
  completeSignUp,
  login,
} as const;
