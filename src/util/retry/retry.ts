import { BackoffStrategy } from "@src/types";
import { pinoLogger } from "@src/logger";
import { sleep } from "../sleep";
import { Action, IRetryOptions, RetryReturnType } from "./types";
import { calculateDelay } from "./helpers";

export function retry<R, E>(
  action: Action<R, E>,
  options?: IRetryOptions
): RetryReturnType<R, E> {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    maxDelay = 10000,
    maxTimeout = 60000,
    backoffStrategy = BackoffStrategy.FIXED,
    retryCondition,
  } = options || {};

  return async function () {
    let lastError: E | undefined;
    const startTime = Date.now();

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      if (Date.now() - startTime > maxTimeout) {
        pinoLogger.warn("Retry operation timed out");
        break;
      }

      if (attempt > 1) {
        const delay = calculateDelay({
          attempt,
          baseDelay,
          maxDelay,
          backoffStrategy,
        });

        await sleep(delay);
      }

      const [data, error] = await action();

      if (data) {
        return [data, undefined] as [R, undefined];
      }

      lastError = error;

      if (retryCondition && !retryCondition(error)) {
        break;
      }
    }

    pinoLogger.warn("Retried action failed finally");
    return [undefined, lastError] as [undefined, E];
  };
}
