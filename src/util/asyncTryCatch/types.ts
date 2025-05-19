export type AsyncReturn<R, E> = Promise<[R, undefined] | [undefined, E]>;

export type PromiseType = Promise<unknown>;
