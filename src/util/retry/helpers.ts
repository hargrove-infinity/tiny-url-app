import { BackoffStrategy } from "@src/types";
import { ICalculateDelayArgs } from "./types";

export function calculateDelay(args: ICalculateDelayArgs): number {
  const { attempt, baseDelay, maxDelay, backoffStrategy } = args;

  let delay: number;

  switch (backoffStrategy) {
    case BackoffStrategy.FIXED:
      delay = baseDelay;
      break;

    case BackoffStrategy.LINEAR:
      delay = baseDelay * attempt;
      break;

    case BackoffStrategy.EXPONENTIAL:
      delay = baseDelay * Math.pow(2, attempt - 1);
      break;

    default:
      delay = baseDelay;
  }

  return Math.min(delay, maxDelay);
}
