import { LinkRepo } from "@src/repos";
import { ErrorHandler, generateShortId, prisma } from "@src/util";
import { LinkServiceResult } from "@src/types";

/**
 * Add one link.
 */
async function addOne(url: string): LinkServiceResult {
  try {
    if (!url) {
      return [null, ErrorHandler.Links.urlForConvertingNotProvided()];
    }

    let shortUrl = generateShortId(url);

    let [fetchedLink, errorFetchedLink] = await LinkRepo.getFirst({
      prisma,
      args: { where: { shortener: shortUrl } },
    });

    if (errorFetchedLink) {
      return [
        null,
        ErrorHandler.Common.reThrowApplicationError(errorFetchedLink),
      ];
    }

    while (fetchedLink) {
      shortUrl = generateShortId(url);
      [fetchedLink, errorFetchedLink] = await LinkRepo.getFirst({
        prisma,
        args: { where: { shortener: shortUrl } },
      });

      if (errorFetchedLink) {
        return [
          null,
          ErrorHandler.Common.reThrowApplicationError(errorFetchedLink),
        ];
      }
    }

    const [createdLink, errorCreatedLink] = await LinkRepo.add({
      prisma,
      url,
      shortener: shortUrl,
    });

    if (errorCreatedLink) {
      return [
        null,
        ErrorHandler.Common.reThrowApplicationError(errorCreatedLink),
      ];
    }

    if (!createdLink) {
      return [null, ErrorHandler.Links.errorWhileCreationLink()];
    }

    return [createdLink, null];
  } catch (error) {
    return [null, ErrorHandler.Links.unknownServiceErrorForCreatingLink()];
  }
}

/**
 * Redirect to url.
 */
async function redirectToUrl(shortUrl: string): LinkServiceResult {
  try {
    if (!shortUrl) {
      return [null, ErrorHandler.Links.shortUrlForRedirectingNotProvided()];
    }

    const [firstLink, error] = await LinkRepo.getFirst({
      prisma,
      args: { where: { shortener: shortUrl } },
    });

    if (error) {
      return [null, ErrorHandler.Common.reThrowApplicationError(error)];
    }

    if (!firstLink) {
      return [
        null,
        ErrorHandler.Links.shortUrlForRedirectingNotFoundInDatabase(),
      ];
    }

    return [firstLink, null];
  } catch (error) {
    return [null, ErrorHandler.Links.unknownServiceErrorForRedirectingToUrl()];
  }
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkService = { addOne, redirectToUrl } as const;
