import { signIn } from 'next-auth/react';
import * as React from 'react';

export const PROVIDER_ID = 'credentials';

type Options = {
  callbackUrl?: string;
  redirect?: boolean;
};

const DEFAULT_OPTIONS: Options = {
  callbackUrl: '/administration',
  redirect: true,
};

const useCredentialsSignIn = ({
  callbackUrl, redirect,
}: Options = DEFAULT_OPTIONS) => {
  const [loading, setLoading] = React.useState(false);

  const action = () => {
    setLoading(true);

    return signIn(PROVIDER_ID, {
      callbackUrl: callbackUrl ?? DEFAULT_OPTIONS.callbackUrl,
      redirect: redirect ?? DEFAULT_OPTIONS.redirect,
    })
      .catch((error: Error) => {
        console.error('Failed to signIn:', error);
      })
      .finally(() => setLoading(false));
  };

  return { loading, signIn: action };
};

export default useCredentialsSignIn;