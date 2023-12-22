import { MeDocs } from '@/_core/components/me/docs/docs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Me',
}

export default function MePage() {
  return <MeDocs />;
}