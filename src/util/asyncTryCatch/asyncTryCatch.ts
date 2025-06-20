import { AsyncTryCatchReturn } from "@src/types";
import { PromiseType } from "./types";

export async function asyncTryCatch<R, E>(
  promise: PromiseType<R>
): AsyncTryCatchReturn<R, E> {
  try {
    throw new Error("HERE");
    const data = await promise;
    return [data, undefined];
  } catch (error) {
    return [, error];
  }
}
