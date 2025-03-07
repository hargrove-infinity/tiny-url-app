import crypto from "crypto";

export function generateShortId(url: string, length = 7) {
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
