import { PromiseLink } from "@src/types";
import { LinkRepo } from "@src/repos";
import { generateUniqueShortUrl } from "./helpers";

/**
 * Add one link.
 */
async function addOne(url: string): PromiseLink {
  return await generateUniqueShortUrl(url);
}

/**
 * Redirect to url.
 */
async function redirectToUrl(shortUrl: string) {
  return await LinkRepo.getFirst({ where: { shortener: shortUrl } });
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkService = { addOne, redirectToUrl } as const;
