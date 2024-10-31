/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';

import {
    getSession as getSessionAction,
    logIn as logInAction,
    logOut as logOutAction,
} from '@/security/action';

const useAuth = () => {
    const [session, setSession] = React.useState<{
        status: 'unauthenticated' | 'authenticated',
    } | null>(null);

    const getSession = React.useCallback(async () => {
        await getSessionAction().then((response) => {
            setSession(response);
        });
    }, []);

    const logIn = React.useCallback(async (credentials: any) => {
        await logInAction(credentials).then((response) => {
            setSession(response);
        });
    }, []);

    const logOut = React.useCallback(async () => {
        await logOutAction().then(() => {
            setSession({ status: 'unauthenticated' });
        });
    }, []);

    React.useEffect(() => {
        getSession();
    }, [getSession]);

    return {
        status: session?.status || 'unauthenticated',
        loading: session === null,
        logOut,
        logIn,
    };
}

export default useAuth;
