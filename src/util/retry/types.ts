import { BackoffStrategy } from "@src/types";

export interface IRetryOptions {
  maxRetries?: number;
  baseDelay?: number;
  maxDelay?: number;
  maxTimeout?: number;
  backoffStrategy?: BackoffStrategy;
  retryCondition?: (error: any) => boolean;
}

export type Action<R, E> = () => Promise<[R, undefined] | [undefined, E]>;

export type RetryReturnType<R, E> = () => Promise<
  [R, undefined] | [undefined, E]
>;

export interface ICalculateDelayArgs {
  attempt: number;
  baseDelay: number;
  maxDelay: number;
  backoffStrategy: BackoffStrategy;
}
