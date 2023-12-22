import '@/_core/css/globals.css';

import type { Metadata } from 'next';
import { SessionProvider } from '@/_core/components/session-provider/session-provider';
import { Session, getServerSession } from 'next-auth';
import { options } from '@lib/auth';
import { Header } from '@/_core/components/site/header/header';
import { Gtm } from '@/_core/components/gtm/gtm';

export const metadata: Metadata = {
  title: 'Frontendly',
  description: 'Best frontend interactive tutorials',
}

interface SiteLayoutProps {
  children: React.ReactNode;
}

export default async function SiteLayout({ children }: SiteLayoutProps) {
  const session: Session | null = await getServerSession(options);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Gtm />
      </head>
      <body>
        <SessionProvider session={session}>
          <Header session={session} />
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
