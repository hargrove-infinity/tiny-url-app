import { LinkRepo } from "@src/repos";
import { ErrorHandler, generateShortId, prisma } from "@src/util";
import { IAddLinkServiceArgs, LinkResultService } from "@src/types";
import { pinoLogger } from "@src/logger";
import { ApplicationError } from "@src/common";

/**
 * Add one link.
 */
async function addOne({ url, userId }: IAddLinkServiceArgs): LinkResultService {
  if (!url) {
    pinoLogger.error("Url for converting not provided");
    return [, ErrorHandler.Links.urlForConvertingNotProvided()] as [
      never,
      ApplicationError
    ];
  }

  let shortUrl = generateShortId(url);

  let [fetchedLink, errorFetchedLink] = await LinkRepo.getFirst({
    prisma,
    args: { where: { shortener: shortUrl } },
  });

  if (errorFetchedLink) {
    return [, errorFetchedLink] as [never, ApplicationError];
  }

  while (fetchedLink) {
    shortUrl = generateShortId(url);
    [fetchedLink, errorFetchedLink] = await LinkRepo.getFirst({
      prisma,
      args: { where: { shortener: shortUrl } },
    });

    if (errorFetchedLink) {
      return [, errorFetchedLink] as [never, ApplicationError];
    }
  }

  const [createdLink, errorCreatedLink] = await LinkRepo.add({
    prisma,
    data: { url, shortener: shortUrl, userId },
  });

  if (errorCreatedLink) {
    return [, errorCreatedLink] as [never, ApplicationError];
  }

  return [createdLink];
}

/**
 * Redirect to url.
 */
async function redirectToUrl(shortUrl: string): LinkResultService {
  if (!shortUrl) {
    pinoLogger.error("Short url for redirecting not provided");
    return [, ErrorHandler.Links.shortUrlForRedirectingNotProvided()] as [
      never,
      ApplicationError
    ];
  }

  const [firstLink, error] = await LinkRepo.getFirst({
    prisma,
    args: { where: { shortener: shortUrl } },
  });

  if (error) {
    return [, error] as [never, ApplicationError];
  }

  if (!firstLink) {
    return [, ErrorHandler.Common.serverFailure()] as [never, ApplicationError];
  }

  return [firstLink];
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkService = { addOne, redirectToUrl } as const;
