export interface IRetryOptions {
  maxRetries?: number;
  delay?: number;
}

export type Action<R, E> = () => Promise<[R, undefined] | [undefined, E]>;

export type RetryReturnType<R, E> = () => Promise<
  [R, undefined] | [undefined, E]
>;

export enum BackoffStrategy {
  FIXED = "FIXED",
  EXPONENTIAL = "EXPONENTIAL",
  LINEAR = "LINEAR",
}

export interface ICalculateDelayArgs {
  attempt: number;
  baseDelay: number;
  maxDelay: number;
  backoffStrategy: BackoffStrategy;
}
