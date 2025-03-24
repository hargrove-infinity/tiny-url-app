import crypto from "crypto";
import { DEFAULT_SHORT_URL_LENGTH } from "@src/common";

export function generateShortId(
  url: string,
  length = DEFAULT_SHORT_URL_LENGTH
) {
  const randomSalt = crypto.randomBytes(8).toString("hex");

  const hash = crypto
    .createHash("md5")
    .update(url + randomSalt)
    .digest();

  const b64 = hash
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\//g, "_")
    .replace(/\+/g, "-");

  return b64.substring(0, length);
}
