import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "@src/common";
import { UserRepo } from "@src/repos";
import { ClientErrorService, Jwt, prisma } from "@src/util";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { authorization } = req.headers;

  if (!authorization) {
    res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .send({ errors: ClientErrorService.Token.authorizationTokenMissing() });
    return;
  }

  if (!authorization.startsWith("Bearer")) {
    res.status(HttpStatusCodes.UNAUTHORIZED).send({
      errors: ClientErrorService.Token.authorizationTokenWrongFormat(),
    });
    return;
  }

  const authorizationTokenFormatted = authorization.replace("Bearer ", "");

  const [result, error] = Jwt.verifyAuthToken(authorizationTokenFormatted);

  if (error) {
    res
      .status(error.httpStatusCode)
      .send({ errors: error.buildErrorPayload() });
    return;
  }

  const [uniqueUser, errorGetUser] = await UserRepo.getUnique({
    prisma,
    args: { where: { id: result.id } },
  });

  if (errorGetUser) {
    res
      .status(errorGetUser.httpStatusCode)
      .send({ errors: errorGetUser.buildErrorPayload() });
    return;
  }

  if (!uniqueUser) {
    res.status(HttpStatusCodes.UNAUTHORIZED).send({
      errors: ClientErrorService.Users.userUnauthorizedPayload([
        result.username,
      ]),
    });
    return;
  }

  req.user = uniqueUser;

  next();
}
