export function buildSignUpLink(signUpToken: string): string {
  return `http://localhost:5173/complete-signup?token=${signUpToken}`;
}
