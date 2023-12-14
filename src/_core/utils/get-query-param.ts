export function getQueryParameter(url: string, key: string): string | null {
  return new URL(url).searchParams.get(key);
}