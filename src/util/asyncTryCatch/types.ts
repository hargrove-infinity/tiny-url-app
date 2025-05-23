export type AsyncReturn<R, E> = Promise<[R] | [never, E]>;

export type PromiseType<R> = Promise<R>;
