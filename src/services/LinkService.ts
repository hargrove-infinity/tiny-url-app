import { LinkRepo } from "@src/repos";
import { ApplicationError, HttpStatusCodes, LINKS } from "@src/common";
import { buildResponse, generateShortId, prisma } from "@src/util";
import { LinkServiceResult } from "@src/types";

/**
 * Add one link.
 */
async function addOne(url: string): LinkServiceResult {
  try {
    if (!url) {
      return buildResponse({
        responseData: null,
        errorData: {
          message: LINKS.ERROR_MESSAGES.SERVICE_ERROR_LINKS,
          errorCode: LINKS.ERROR_CODES.URL_FOR_CONVERTING_NOT_PROVIDED,
          statusCode: HttpStatusCodes.BAD_REQUEST,
        },
      });
    }

    let shortUrl = generateShortId(url);

    let [fetchedLink, error] = await LinkRepo.getFirst({
      prisma,
      args: { where: { shortener: shortUrl } },
    });

    if (error) {
      return buildResponse({
        responseData: null,
        errorData: {
          message: error.message,
          errorCode: error.appErrorCode,
          statusCode: error.httpStatusCode,
        },
      });
    }

    while (fetchedLink) {
      shortUrl = generateShortId(url);
      [fetchedLink, error] = await LinkRepo.getFirst({
        prisma,
        args: { where: { shortener: shortUrl } },
      });
    }

    const responseData = await LinkRepo.add({
      prisma,
      url,
      shortener: shortUrl,
    });

    return buildResponse({ responseData, errorData: null });
  } catch (error) {
    return buildResponse({
      responseData: null,
      errorData: {
        message: LINKS.ERROR_MESSAGES.SERVICE_ERROR_LINKS,
        errorCode:
          LINKS.ERROR_CODES.UNKNOWN_SERVICE_ERROR_FOR_CREATING_SHORT_URL,
        statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

/**
 * Redirect to url.
 */
async function redirectToUrl(shortUrl: string): LinkServiceResult {
  try {
    if (!shortUrl) {
      return buildResponse({
        responseData: null,
        errorData: {
          message: LINKS.ERROR_MESSAGES.SERVICE_ERROR_LINKS,
          errorCode: LINKS.ERROR_CODES.SHORT_URL_FOR_REDIRECTING_NOT_PROVIDED,
          statusCode: HttpStatusCodes.BAD_REQUEST,
        },
      });
    }

    const [firstLink, error] = await LinkRepo.getFirst({
      prisma,
      args: { where: { shortener: shortUrl } },
    });

    if (error) {
      return buildResponse({
        responseData: null,
        errorData: {
          message: error.message,
          errorCode: error.appErrorCode,
          statusCode: error.httpStatusCode,
        },
      });
    }

    return buildResponse({ responseData: firstLink, errorData: null });
  } catch (error) {
    if (error instanceof ApplicationError) {
      return buildResponse({
        responseData: null,
        errorData: {
          message: error.message,
          errorCode: error.appErrorCode,
          statusCode: error.httpStatusCode,
        },
      });
    }

    return buildResponse({
      responseData: null,
      errorData: {
        message: LINKS.ERROR_MESSAGES.SERVICE_ERROR_LINKS,
        errorCode:
          LINKS.ERROR_CODES.UNKNOWN_SERVICE_ERROR_FOR_REDIRECTING_TO_URL,
        statusCode: HttpStatusCodes.INTERNAL_SERVER_ERROR,
      },
    });
  }
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkService = { addOne, redirectToUrl } as const;
