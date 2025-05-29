import { Link } from "@prisma/client";
import { ApplicationError } from "@src/common";
import { pinoLogger } from "@src/logger";
import {
  IAddLinkArgs,
  IGetFirstLinkArgs,
  GetFirstLinkRepoResult,
  AddLinkRepoResult,
  Nullable,
  PrismaError,
} from "@src/types";
import { asyncTryCatch, AppErrorService } from "@src/util";

/**
 * Get first link.
 */
async function getFirst({
  prisma,
  args,
}: IGetFirstLinkArgs): GetFirstLinkRepoResult {
  const res = prisma.link.findFirst(args);
  pinoLogger.info("Getting first link from database");
  const [data, error] = await asyncTryCatch<Nullable<Link>, PrismaError>(res);

  if (error) {
    pinoLogger.error(
      { error: error.message },
      "Error during getting first link from database"
    );

    return [, AppErrorService.Links.getFirstLinkDatabaseError()] as [
      never,
      ApplicationError
    ];
  }

  pinoLogger.info("First link successfully fetched from database");
  return [data];
}

/**
 * Add one link.
 */
async function add({ prisma, data }: IAddLinkArgs): AddLinkRepoResult {
  const res = prisma.link.create({ data });
  pinoLogger.info("Adding link to database");
  const [link, error] = await asyncTryCatch<Link, PrismaError>(res);

  if (error) {
    pinoLogger.error(
      { error: error.message },
      "Error during adding link to database"
    );

    return [, AppErrorService.Links.addOneLinkDatabaseError()] as [
      never,
      ApplicationError
    ];
  }

  pinoLogger.info("Link successfully added to database");
  return [link];
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkRepo = { getFirst, add } as const;
