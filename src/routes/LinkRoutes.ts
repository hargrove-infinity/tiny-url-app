import { Response } from "express";
import { LinkService } from "@src/services";
import { HttpStatusCodes } from "@src/common";
import { AddLinkRequest, RedirectLinkRequest } from "@src/types";
import { ErrorHandler } from "@src/util";

/**
 * Add one link.
 */
async function add(req: AddLinkRequest, res: Response): Promise<void> {
  const { user, body } = req;
  const { url } = body;

  if (!user) {
    res
      .status(HttpStatusCodes.BAD_REQUEST)
      .send({ errors: ErrorHandler.Users.userMissingRequestData() });
    return;
  }

  const [link, error] = await LinkService.addOne({ url, userId: user.id });

  if (error) {
    res
      .status(error.httpStatusCode)
      .send({ errors: error.buildErrorPayload() });
    return;
  }

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
    res.status(error.httpStatusCode).send({ error: error.buildErrorPayload() });
    return;
  }

  res.status(HttpStatusCodes.MOVED_PERMANENTLY).redirect(link.url);
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkRoutes = { add, redirectToUrl } as const;
