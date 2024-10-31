'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';
import useSession from '@/security/use-session';

const PublicLayout = ({ children }: React.PropsWithChildren) => {
  const { status, loading } = useSession();
  const router = useRouter();

  React.useEffect(() => {
    if (loading === false && status === 'authenticated') {
      router.push('/');
    }
  }, [status, router, loading]);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default PublicLayout;