'use client';

import * as React from 'react';

import AccessDenied from '@/components/security/access-denied';
import useSession from '@/security/use-session';

const ProtectedLayout = ({ children }: React.PropsWithChildren) => {
  const { status, loading } = useSession();

  if (loading === false && 'unauthenticated' === status) {
    return <AccessDenied />;
  };

  return <>{children}</>;
};

export default ProtectedLayout;
