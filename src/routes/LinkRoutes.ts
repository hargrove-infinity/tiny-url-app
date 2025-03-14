import { Response } from "express";
import { LinkService } from "@src/services";
import { HttpStatusCodes } from "@src/common";
import { IAddLinkBody, IRedirectLinkParams, Req } from "@src/types";

/**
 * Add one link.
 */
async function add(req: Req<{}, {}, IAddLinkBody>, res: Response) {
  try {
    const { url } = req.body;
    const link = await LinkService.addOne(url);
    res.status(HttpStatusCodes.CREATED).send(link);
  } catch (error) {
    res.status(HttpStatusCodes.BAD_REQUEST).send({ error });
  }
}

/**
 * Redirect to url.
 */
async function redirectToUrl(
  req: Req<IRedirectLinkParams, {}, {}>,
  res: Response
) {
  const { shortUrl } = req.params;
  const link = await LinkService.redirectToUrl(shortUrl);
  if (link) {
    return res.status(HttpStatusCodes.MOVED_PERMANENTLY).redirect(link.url);
  }
  res.status(HttpStatusCodes.NOT_FOUND).send("Not found");
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkRoutes = {
  add,
  redirectToUrl,
} as const;
