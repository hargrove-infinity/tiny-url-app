import { AsyncReturn, PromiseType } from "./types";

export async function asyncTryCatch<R, E>(
  promise: PromiseType<R>
): AsyncReturn<R, E> {
  try {
    const data = await promise;
    return [data, undefined];
  } catch (error) {
    return [, error];
  }
}
