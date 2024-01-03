import { headers } from 'next/headers';

export function getIsMobile(): boolean {
  const ua: string | null = headers().get('User-Agent');

  if (ua === null) return false;

  return /(phone|mobile)/i.test(ua);
}