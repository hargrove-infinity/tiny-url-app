import { LinkRepo } from "@src/repos";
import { ErrorHandler, generateShortId, prisma } from "@src/util";
import { IAddLinkServiceArgs, LinkResult } from "@src/types";

/**
 * Add one link.
 */
async function addOne({ url, userId }: IAddLinkServiceArgs): LinkResult {
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
      data: { url, shortener: shortUrl, userId },
    });

    if (errorCreatedLink) {
      return [
        null,
        ErrorHandler.Common.reThrowApplicationError(errorCreatedLink),
      ];
    }

    return [createdLink, null];
  } catch (error) {
    return [null, ErrorHandler.Links.unknownServiceErrorForCreatingLink()];
  }
}

/**
 * Redirect to url.
 */
async function redirectToUrl(shortUrl: string): LinkResult {
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
