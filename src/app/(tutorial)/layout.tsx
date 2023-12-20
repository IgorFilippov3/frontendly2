import '@/_core/css/globals.css';

import { SandpackCSS } from "@/_core/components/sandbox/sandpack-styles";
import { SessionProvider } from "@/_core/components/session-provider/session-provider";
import { options } from "@lib/auth";
import { getServerSession } from "next-auth";
import { Gtm } from '@/_core/components/gtm/gtm';

interface TutorialLayoutProps {
  children: React.ReactNode;
}

export default async function TutorialLayout({ children }: TutorialLayoutProps) {
  const session = await getServerSession(options);

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <SandpackCSS />
        <Gtm />
      </head>
      <body>
        <SessionProvider session={session}>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}