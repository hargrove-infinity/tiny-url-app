import { pinoLogger } from "@src/logger";
import { sleep } from "../sleep";
import { Action, IRetryOptions, RetryReturnType } from "./types";

export function retry<R, E>(
  action: Action<R, E>,
  options?: IRetryOptions
): RetryReturnType<R, E> {
  const { maxRetries = 3, delay = 1000 } = options || {};

  return async function () {
    let lastError: E | undefined;

    for (let i = 1; i <= maxRetries; i++) {
      if (i > 1) {
        await sleep(delay);
      }

      const [data, error] = await action();

      if (data) {
        return [data, undefined] as [R, undefined];
      }

      lastError = error;
    }

    pinoLogger.warn("Retried action failed finally");
    return [undefined, lastError] as [undefined, E];
  };
}
