import { describe, expect, it } from 'vitest';
import { getEmailError, isEpamEmail } from '../email.utils';

describe('isEpamEmail', () => {
  it('returns true for a valid @epam.com address', () => {
    expect(isEpamEmail('alex.nguyen@epam.com')).toBe(true);
  });

  it('returns false for a different domain', () => {
    expect(isEpamEmail('user@gmail.com')).toBe(false);
  });

  it('returns false for a domain that only contains epam.com as a substring', () => {
    expect(isEpamEmail('user@notepam.com')).toBe(false);
  });

  it('returns false for an empty string', () => {
    expect(isEpamEmail('')).toBe(false);
  });

  it('returns false for a plain domain without local part', () => {
    expect(isEpamEmail('@epam.com')).toBe(false);
  });

  it('trims whitespace before checking', () => {
    expect(isEpamEmail('  user@epam.com  ')).toBe(true);
  });
});

describe('getEmailError', () => {
  it('returns null when email is valid', () => {
    expect(getEmailError('dev@epam.com')).toBeNull();
  });

  it('returns required message for empty string', () => {
    expect(getEmailError('')).toBe('Email is required.');
  });

  it('returns domain error for non-epam address', () => {
    expect(getEmailError('user@company.com')).toBe('Only @epam.com addresses are allowed.');
  });

  it('returns domain error for whitespace-only input', () => {
    expect(getEmailError('   ')).toBe('Email is required.');
  });
});
