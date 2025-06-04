import { Response } from "express";
import { LinkService } from "@src/services";
import { HttpStatusCodes } from "@src/common";
import { AddLinkRequest, RedirectLinkRequest } from "@src/types";
import { ClientErrorService } from "@src/util";
import { pinoLogger } from "@src/logger";

/**
 * Add one link.
 */
async function add(req: AddLinkRequest, res: Response): Promise<void> {
  const { user, body } = req;
  const { url } = body;

  if (!user) {
    pinoLogger.warn(
      "User data is not attached to the request object in add link route"
    );

    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ errors: ClientErrorService.Users.userMissingRequestData() });
    return;
  }

  const [link, error] = await LinkService.addOne({ url, userId: user.id });

  if (error) {
    pinoLogger.warn(
      { message: error.message },
      "Error occurred in add link route"
    );

    res
      .status(error.httpStatusCode)
      .send({ errors: error.buildErrorPayload() });
    return;
  }

  pinoLogger.info("Created link is sending to the client");
  res.status(HttpStatusCodes.CREATED).send(link);
}

/**
 * Redirect to url.
 */
async function redirectToUrl(
  req: RedirectLinkRequest,
  res: Response
): Promise<void> {
  const { shortUrl } = req.params;
  const [link, error] = await LinkService.redirectToUrl(shortUrl);

  if (error) {
    pinoLogger.warn(
      { message: error.message },
      "Error occurred in add link route"
    );
    res.status(error.httpStatusCode).send({ error: error.buildErrorPayload() });
    return;
  }

  pinoLogger.info("Redirecting to the url");
  res.status(HttpStatusCodes.MOVED_PERMANENTLY).redirect(link.url);
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkRoutes = { add, redirectToUrl } as const;
