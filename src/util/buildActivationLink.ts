export function buildActivationLink(hash: string): string {
  return `http://localhost:3000/users/email-verification?hash=${hash}`;
}
