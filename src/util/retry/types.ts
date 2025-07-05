export interface IRetryOptions {
  maxRetries?: number;
  delay?: number;
}

export type Action<R, E> = () => Promise<[R, undefined] | [undefined, E]>;

export type RetryReturnType<R, E> = () => Promise<
  [R, undefined] | [undefined, E]
>;
