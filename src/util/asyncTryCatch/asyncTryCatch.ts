import { AsyncReturn, PromiseType } from "./types";

export async function asyncTryCatch<R, E>(
  promise: PromiseType<R>
): AsyncReturn<R, E> {
  try {
    const data = await promise;
    return [data];
  } catch (error) {
    return [, error as E] as [never, E];
  }
}
