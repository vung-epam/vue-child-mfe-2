import { describe, expect, it } from 'vitest';
import { parseBulkInput } from '../bulk.utils';

describe('parseBulkInput', () => {
  it('parses CSV with headers', () => {
    const input = [
      'firstName,lastName,email',
      'Alex,Nguyen,alex.nguyen@epam.com',
    ].join('\n');

    const result = parseBulkInput(input);

    expect(result.hasHeader).toBe(true);
    expect(result.errors).toHaveLength(0);
    expect(result.rows).toEqual([
      {
        firstName: 'Alex',
        lastName: 'Nguyen',
        email: 'alex.nguyen@epam.com',
      },
    ]);
  });

  it('parses CSV without headers', () => {
    const input = 'Jane,Doe,jane.doe@epam.com';

    const result = parseBulkInput(input);

    expect(result.hasHeader).toBe(false);
    expect(result.errors).toHaveLength(0);
    expect(result.rows[0]).toEqual({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@epam.com',
    });
  });

  it('returns errors for invalid email', () => {
    const input = [
      'firstName,lastName,email',
      'Alex,Nguyen,alex@gmail.com',
    ].join('\n');

    const result = parseBulkInput(input);

    expect(result.errors).toHaveLength(1);
    expect(result.errors[0]).toContain('@epam.com');
  });

  it('returns errors for missing required values', () => {
    const input = ['firstName,lastName,email', 'Alex,,'].join('\n');

    const result = parseBulkInput(input);

    expect(result.errors).toEqual([
      'Row 2: lastName is required.',
      'Row 2: Email is required.',
    ]);
  });
});
