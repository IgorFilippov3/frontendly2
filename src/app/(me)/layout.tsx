import './globals-me.css';

import { MeHeader } from "@/_core/components/me/header/header";
import { SessionProvider } from "@/_core/components/session-provider/session-provider";
import { options } from "@lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Inter } from 'next/font/google'
import { MeStateProvider } from '@/_core/components/me/state-provider/state-provider';
import { MeSnackbar } from '@/_core/components/me/snackbar/snackbar';
import { Gtm } from '@/_core/components/gtm/gtm';

const inter = Inter({ subsets: ['latin'] });

interface MeLayoutProps {
  children: React.ReactNode;
}

export default async function MeLayout({ children }: MeLayoutProps) {
  const session = await getServerSession(options);

  if (!session) {
    return redirect('/');
  }

  return (
    <html>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Gtm />
      </head>
      <body className={inter.className}>
        <SessionProvider session={session}>
          <MeStateProvider>
            <MeHeader />
            <MeSnackbar />
            <div className="me">
              {children}
            </div>
          </MeStateProvider>
        </SessionProvider>
      </body>
    </html>
  );
}