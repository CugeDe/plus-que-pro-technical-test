'use client';

import { SessionProvider } from 'next-auth/react';
import * as React from 'react';

const NextAuthProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => (
  <SessionProvider>
    {children}
  </SessionProvider>
);

export default NextAuthProvider;
