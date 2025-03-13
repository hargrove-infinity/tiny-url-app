import { PromiseLink } from "@src/types";
import { LinkRepo } from "@src/repos";
import { generateShortId, prisma } from "@src/util";

/**
 * Add one link.
 */
async function addOne(url: string): PromiseLink {
  let shortUrl = generateShortId(url);

  let fetchedLink = await LinkRepo.getFirst({
    prisma,
    args: { where: { shortener: shortUrl } },
  });

  while (fetchedLink) {
    shortUrl = generateShortId(url);
    fetchedLink = await LinkRepo.getFirst({
      prisma,
      args: { where: { shortener: shortUrl } },
    });
  }

  return LinkRepo.add({ prisma, url, shortener: shortUrl });
}

/**
 * Redirect to url.
 */
async function redirectToUrl(shortUrl: string) {
  return await LinkRepo.getFirst({
    prisma,
    args: { where: { shortener: shortUrl } },
  });
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkService = { addOne, redirectToUrl } as const;
