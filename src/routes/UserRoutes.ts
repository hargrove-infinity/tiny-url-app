import { Response } from "express";
import { UserService } from "@src/services";
import { HttpStatusCodes } from "@src/common";
import {
  RequestSignUpReq,
  LoginUserRequest,
  CompleteSignUpRequest,
} from "@src/types";
import { pinoLogger } from "@src/logger";

/**
 * Request sign up.
 */
async function requestSignUp(
  req: RequestSignUpReq,
  res: Response
): Promise<void> {
  const { body } = req;
  const [data, error] = await UserService.requestSignUp(body);

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

  pinoLogger.info("User registration initiated. Set password email sent.");
  res.status(HttpStatusCodes.OK).send(data);
}

/**
 * Complete sign up.
 */
async function completeSignUp(
  req: CompleteSignUpRequest,
  res: Response
): Promise<void> {
  const { body } = req;
  const [token, error] = await UserService.completeSignUp(body);

  if (error) {
    pinoLogger.warn(
      { error: error.message },
      "Error in completeSignUp user route"
    );

    res
      .status(error.httpStatusCode)
      .send({ errors: error.buildErrorPayload() });
    return;
  }

  pinoLogger.info(
    "User registration completed successfully. Token is sending to the client."
  );
  res.status(HttpStatusCodes.CREATED).send(token);
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
  requestSignUp,
  completeSignUp,
  login,
} as const;
