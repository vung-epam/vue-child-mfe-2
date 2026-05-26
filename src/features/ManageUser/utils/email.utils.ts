const EPAM_DOMAIN = '@epam.com';

export function isEpamEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim().toLowerCase();
  return trimmed.indexOf('@') > 0 && trimmed.endsWith(EPAM_DOMAIN);
}

export function getEmailError(email: string): string | null {
  if (!email.trim()) return 'Email is required.';
  if (!isEpamEmail(email)) return 'Only @epam.com addresses are allowed.';
  return null;
}
