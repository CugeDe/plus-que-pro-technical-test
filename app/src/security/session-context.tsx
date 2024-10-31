'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

import useAuth from './use-auth';

export const SessionContext = React.createContext<{
    status: 'unauthenticated' | 'authenticated',
    loading: boolean,
    logOut: () => Promise<void>,
    logIn: (credentials: any) => Promise<void>,
}>({
    status: 'unauthenticated',
    loading: true,
    logOut: async () => {},
    logIn: async () => {},
});

export const SessionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const session = useAuth();

    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    );
};

