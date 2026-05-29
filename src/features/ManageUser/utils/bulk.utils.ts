import type { CreateUserPayload } from '../../../shared/api/user.api';
import { getEmailError } from './email.utils';

const REQUIRED_HEADERS = ['firstName', 'lastName', 'email'];

const normalizeHeader = (value: string) => value.trim().toLowerCase();

const parseLine = (line: string) =>
  line.split(',').map((value) => value.trim());

export interface BulkParseResult {
  rows: CreateUserPayload[];
  errors: string[];
  hasHeader: boolean;
}

export function parseBulkInput(input: string): BulkParseResult {
  const lines = input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!lines.length) {
    return { rows: [], errors: [], hasHeader: false };
  }

  const firstLine = parseLine(lines[0]);
  const normalizedHeaders = firstLine.map(normalizeHeader);
  const requiredNormalized = REQUIRED_HEADERS.map(normalizeHeader);
  const hasHeader = requiredNormalized.every((header) =>
    normalizedHeaders.includes(header),
  );

  const headerIndex = new Map<string, number>();
  const headerSource = hasHeader ? normalizedHeaders : requiredNormalized;
  headerSource.forEach((header, index) => headerIndex.set(header, index));

  const rows: CreateUserPayload[] = [];
  const errors: string[] = [];
  const startIndex = hasHeader ? 1 : 0;

  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index];
    const columns = parseLine(line);
    const rowNumber = index + 1;

    const firstName = columns[headerIndex.get('firstname') ?? 0] ?? '';
    const lastName = columns[headerIndex.get('lastname') ?? 1] ?? '';
    const email = columns[headerIndex.get('email') ?? 2] ?? '';

    if (!firstName.trim()) {
      errors.push(`Row ${rowNumber}: firstName is required.`);
    }

    if (!lastName.trim()) {
      errors.push(`Row ${rowNumber}: lastName is required.`);
    }

    const emailError = getEmailError(email);
    if (emailError) {
      errors.push(`Row ${rowNumber}: ${emailError}`);
    }

    rows.push({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
    });
  }

  return { rows, errors, hasHeader };
}
