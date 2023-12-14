import '@/_core/css/globals.css';

import type { Metadata } from 'next';
import { SessionProvider } from '@/_core/components/session-provider/session-provider';
import { getServerSession } from 'next-auth';
import { options } from '@lib/auth';
import { Header } from '@/_core/components/site/header/header';

export const metadata: Metadata = {
  title: 'Frontendly',
  description: 'Best frontend interactive tutorials',
}

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
