'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import * as React from 'react';

const PublicLayout = ({ children }: React.PropsWithChildren) => {
  const { status } = useSession();

  if (status === 'authenticated') return redirect('/administration');

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default PublicLayout;