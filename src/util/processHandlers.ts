import {
  UNCAUGHT_EXCEPTION_MESSAGE,
  UNHANDLED_REJECTION_MESSAGE,
} from "@src/common";
import { pinoLogger } from "@src/logger";

export function uncaughtExceptionCatch(error: Error) {
  pinoLogger.fatal(error, UNCAUGHT_EXCEPTION_MESSAGE);
  process.exit(1);
}

export function unhandledRejectionCatch(reason: unknown) {
  pinoLogger.fatal(reason, UNHANDLED_REJECTION_MESSAGE);
  process.exit(1);
}
