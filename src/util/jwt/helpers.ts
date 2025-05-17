import { ITokenPayload } from "./types";

export function verifyDecodedToken(data: unknown): data is ITokenPayload {
  return !!(
    data instanceof Object &&
    "id" in data &&
    typeof data.id === "number" &&
    "name" in data &&
    typeof data.name === "string" &&
    "username" in data &&
    typeof data.username === "string" &&
    "iat" in data &&
    typeof data.iat === "number" &&
    "exp" in data &&
    typeof data.exp === "number"
  );
}
