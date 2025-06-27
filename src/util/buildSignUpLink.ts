import { ENV } from "@src/common";

export function buildSignUpLink(signUpToken: string): string {
  return `${ENV.FRONTEND_SIGN_UP_URL}?token=${signUpToken}`;
}
