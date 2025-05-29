import { LinkRepo } from "@src/repos";
import { AppErrorService, generateShortId, prisma } from "@src/util";
import { IAddLinkServiceArgs, LinkResultService } from "@src/types";
import { pinoLogger } from "@src/logger";
import { ApplicationError } from "@src/common";

/**
 * Add one link.
 */
async function addOne({ url, userId }: IAddLinkServiceArgs): LinkResultService {
  if (!url) {
    pinoLogger.warn("Url for converting not provided");

    return [, AppErrorService.Links.urlForConvertingNotProvided()] as [
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
    pinoLogger.warn(
      { message: errorFetchedLink.message },
      "Error during fetching first link in addOne LinkService before while loop"
    );

    return [, AppErrorService.Common.internalServerError()] as [
      never,
      ApplicationError
    ];
  }

  while (fetchedLink) {
    shortUrl = generateShortId(url);
    [fetchedLink, errorFetchedLink] = await LinkRepo.getFirst({
      prisma,
      args: { where: { shortener: shortUrl } },
    });

    if (errorFetchedLink) {
      pinoLogger.warn(
        { message: errorFetchedLink.message },
        "Error during fetching first link in addOne LinkService inside while loop"
      );

      return [, AppErrorService.Common.internalServerError()] as [
        never,
        ApplicationError
      ];
    }
  }

  const [createdLink, errorCreatedLink] = await LinkRepo.add({
    prisma,
    data: { url, shortener: shortUrl, userId },
  });

  if (errorCreatedLink) {
    pinoLogger.warn(
      { message: errorCreatedLink.message },
      "Error during creating link in addOne LinkService"
    );

    return [, AppErrorService.Common.internalServerError()] as [
      never,
      ApplicationError
    ];
  }

  return [createdLink];
}

/**
 * Redirect to url.
 */
async function redirectToUrl(shortUrl: string): LinkResultService {
  if (!shortUrl) {
    pinoLogger.warn("Short url for redirecting not provided");

    return [, AppErrorService.Links.shortUrlForRedirectingNotProvided()] as [
      never,
      ApplicationError
    ];
  }

  const [firstLink, error] = await LinkRepo.getFirst({
    prisma,
    args: { where: { shortener: shortUrl } },
  });

  if (error) {
    pinoLogger.warn(
      { message: error.message },
      "Error during redirecting in redirectToUrl LinkService"
    );

    return [, AppErrorService.Common.internalServerError()] as [
      never,
      ApplicationError
    ];
  }

  if (!firstLink) {
    pinoLogger.warn(
      "First link is not found in database during redirecting in redirectToUrl LinkService"
    );

    return [, AppErrorService.Links.shortUrlForRedirectingMissing()] as [
      never,
      ApplicationError
    ];
  }

  return [firstLink];
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkService = { addOne, redirectToUrl } as const;
