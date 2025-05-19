import { AsyncReturn, PromiseType } from "./types";

export async function asyncTryCatch<R = unknown, E = unknown>(
  promise: PromiseType
): AsyncReturn<R, E> {
  try {
    const data = await promise;
    return [data as R, undefined];
  } catch (error) {
    return [, error];
  }
}
