export function nameToKey(name: string): string {
  return name
    .trim()
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase();
}