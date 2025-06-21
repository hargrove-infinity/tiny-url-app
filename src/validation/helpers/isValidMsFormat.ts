import ms, { StringValue } from "ms";

export function isValidMsFormat(value: string): boolean {
  const result = ms(value as StringValue);
  return typeof result === "number" && result > 0;
}
