import { Link } from "@prisma/client";
import { ApplicationError } from "@src/common";
import { pinoLogger } from "@src/logger";
import {
  IAddLinkArgs,
  IGetFirstLinkArgs,
  Nullable,
  PrismaError,
  AsyncTryCatchReturn,
} from "@src/types";
import { asyncTryCatch, AppErrorService } from "@src/util";

/**
 * Get first link.
 */
async function getFirst({
  prisma,
  args,
}: IGetFirstLinkArgs): AsyncTryCatchReturn<Nullable<Link>, ApplicationError> {
  const res = prisma.link.findFirst(args);
  pinoLogger.info("Getting first link from database");
  const [data, error] = await asyncTryCatch<Nullable<Link>, PrismaError>(res);

  if (error) {
    pinoLogger.error(
      { error: error.message },
      "Error during getting first link from database"
    );

    return [, AppErrorService.Links.getFirstLinkDatabaseError()];
  }

  pinoLogger.info("First link successfully fetched from database");
  return [data, undefined];
}

/**
 * Add one link.
 */
async function add({
  prisma,
  data,
}: IAddLinkArgs): AsyncTryCatchReturn<Link, ApplicationError> {
  const res = prisma.link.create({ data });
  pinoLogger.info("Adding link to database");
  const [link, error] = await asyncTryCatch<Link, PrismaError>(res);

  if (error) {
    pinoLogger.error(
      { error: error.message },
      "Error during adding link to database"
    );

    return [, AppErrorService.Links.addOneLinkDatabaseError()];
  }

  pinoLogger.info("Link successfully added to database");
  return [link, undefined];
}

/******************************************************************************
                                Export
******************************************************************************/

export const LinkRepo = { getFirst, add } as const;
