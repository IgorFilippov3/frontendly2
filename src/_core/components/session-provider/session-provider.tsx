'use client';

import { Session } from "next-auth";
import { SessionProvider as Provider } from 'next-auth/react';

interface SessionProviderProps extends React.PropsWithChildren {
  session: Session | null;
}

export const SessionProvider = ({ children, session }: SessionProviderProps) => {
  return <Provider session={session}>{children}</Provider>
}