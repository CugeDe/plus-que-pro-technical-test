'use client';

import { useSession } from 'next-auth/react';
import * as React from 'react';

import AccessDenied from '@/components/security/access-denied';

const ProtectedLayout = ({ children }: React.PropsWithChildren) => {
  const session = useSession();

  if ('authenticated' !== session.status) {
    return <AccessDenied />;
  };

  return <>{children}</>;
};

export default ProtectedLayout;
