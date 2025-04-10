import { Request, Response, NextFunction } from "express";
import { HttpStatusCodes } from "@src/common";
import { UserRepo } from "@src/repos";
import { ErrorHandler, Jwt, prisma } from "@src/util";

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .send({ errors: ErrorHandler.Token.authorizationTokenMissing() });
    return;
  }

  const authorizationTokenFormatted = authorization.replace("Bearer ", "");

  const [result, error] = Jwt.verifyToken(authorizationTokenFormatted);

  if (error) {
    res
      .status(error.httpStatusCode)
      .send({ errors: error.buildErrorPayload() });
    return;
  }

  const [firstUser, errorGetUser] = await UserRepo.getFirst({
    prisma,
    args: { where: { username: result.username } },
  });

  if (errorGetUser) {
    res
      .status(errorGetUser.httpStatusCode)
      .send({ errors: errorGetUser.buildErrorPayload() });
    return;
  }

  if (!firstUser) {
    res.status(HttpStatusCodes.NOT_FOUND).send({
      errors: ErrorHandler.Users.userWithEmailNotFoundPayload([
        result.username,
      ]),
    });
    return;
  }

  req.user = firstUser;

  next();
}
