export function parseBoolean(value: string): boolean {
  if (value === 'true') {
    return true;
  }
  if (value === 'false') {
    return false;
  }
  throw new Error('Invalid boolean value');
}
