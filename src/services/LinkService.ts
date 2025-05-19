import { LinkRepo } from "@src/repos";
import { ErrorHandler, generateShortId, prisma } from "@src/util";
import { IAddLinkServiceArgs, LinkResultService } from "@src/types";

/**
 * Add one link.
 */
async function addOne({ url, userId }: IAddLinkServiceArgs): LinkResultService {
  if (!url) {
    return [, ErrorHandler.Links.urlForConvertingNotProvided()];
  }

  let shortUrl = generateShortId(url);

  let [fetchedLink, errorFetchedLink] = await LinkRepo.getFirst({
    prisma,
    args: { where: { shortener: shortUrl } },
  });

  if (errorFetchedLink) {
    return [, errorFetchedLink];
  }

  while (fetchedLink) {
    shortUrl = generateShortId(url);
    [fetchedLink, errorFetchedLink] = await LinkRepo.getFirst({
      prisma,
      args: { where: { shortener: shortUrl } },
    });

    if (errorFetchedLink) {
      return [, errorFetchedLink];
    }
  }

  const [createdLink, errorCreatedLink] = await LinkRepo.add({
    prisma,
    data: { url, shortener: shortUrl, userId },
  });

  if (errorCreatedLink) {
    return [, errorCreatedLink];
  }

  return [createdLink, undefined];
}

/**
 * Redirect to url.
 */
async function redirectToUrl(shortUrl: string): LinkResultService {
  if (!shortUrl) {
    return [, ErrorHandler.Links.shortUrlForRedirectingNotProvided()];
  }

  const [firstLink, error] = await LinkRepo.getFirst({
    prisma,
    args: { where: { shortener: shortUrl } },
  });

  if (error) {
    return [, error];
  }

  if (!firstLink) {
    return [, ErrorHandler.Links.shortUrlForRedirectingNotFoundInDatabase()];
  }

  return [firstLink, undefined];
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkService = { addOne, redirectToUrl } as const;
