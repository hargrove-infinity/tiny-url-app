import { IAuthTokenPayload, IEmailVerificationTokenPayload } from "./types";

export function verifyDecodedAuthToken(
  data: unknown
): data is IAuthTokenPayload {
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

export function verifyDecodedEmailVerificationToken(
  data: unknown
): data is IEmailVerificationTokenPayload {
  return !!(
    data instanceof Object &&
    "username" in data &&
    typeof data.username === "string" &&
    "iat" in data &&
    typeof data.iat === "number" &&
    "exp" in data &&
    typeof data.exp === "number"
  );
}
