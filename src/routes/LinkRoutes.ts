import { Response } from "express";
import { LinkService } from "@src/services";
import { ApplicationError, HttpStatusCodes, LINKS } from "@src/common";
import { IAddLinkBody, IRedirectLinkParams, Req } from "@src/types";

/**
 * Add one link.
 */
async function add(req: Req<{}, {}, IAddLinkBody>, res: Response) {
  try {
    const { url } = req.body;
    const [link, error] = await LinkService.addOne(url);

    if (link) {
      return res.status(HttpStatusCodes.CREATED).send(link);
    }

    if (error) {
      return res.status(error.httpStatusCode).send({ err: error.appErrorCode });
    }

    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
      error: LINKS.ERROR_CODES.ERROR_RETURN_TYPE_ADD_LINK_SERVICE,
    });
  } catch (error) {
    if (error instanceof ApplicationError) {
      return res.status(HttpStatusCodes.BAD_REQUEST).send({ error });
    }

    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
      error: LINKS.ERROR_CODES.UNKNOWN_ROUTE_ERROR_FOR_CREATING_SHORT_URL,
    });
  }
}

/**
 * Redirect to url.
 */
async function redirectToUrl(
  req: Req<IRedirectLinkParams, {}, {}>,
  res: Response
) {
  try {
    const { shortUrl } = req.params;
    const [link, error] = await LinkService.redirectToUrl(shortUrl);

    if (link) {
      return res.status(HttpStatusCodes.MOVED_PERMANENTLY).redirect(link.url);
    }

    if (error) {
      return res.status(error.httpStatusCode).send({ err: error.appErrorCode });
    }

    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
      error: LINKS.ERROR_CODES.ERROR_RETURN_TYPE_REDIRECT_LINK_SERVICE,
    });
  } catch (error) {
    if (error instanceof ApplicationError) {
      return res.status(HttpStatusCodes.BAD_REQUEST).send({ error });
    }

    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send({
      error: LINKS.ERROR_CODES.UNKNOWN_ROUTE_ERROR_FOR_REDIRECTING_TO_URL,
    });
  }
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkRoutes = {
  add,
  redirectToUrl,
} as const;
