'use server';

import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

import { getClient } from "@/clients/main";

const COOKIES_SETTINGS: Partial<ResponseCookie> = {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
};

type Credentials = {
    username: string;
    password: string;
};

type ResponseType = {
    status: 'unauthenticated' | 'authenticated',
};

export const getSession = async (): Promise<ResponseType> => {
    const cookieStore = cookies();

    const accessToken = cookieStore.get('app.auth.access');
    // const refreshToken = cookieStore.get('app.auth.refresh');

    if (!accessToken) {
        return { status: 'unauthenticated' };
    }

    return { status: 'authenticated' };
};

export const logIn = async (data: Credentials): Promise<ResponseType> => {
    const cookieStore = cookies();
    const { username, password } = data;

    const response = await getClient().post('oauth/token', {
        json: {
            grant_type: 'password',
            client_id: process.env.API_CLIENT_ID,
            client_secret: process.env.API_CLIENT_SECRET,
            username,
            password,
            scope: '',
        },
        prefixUrl: process.env.API_URL?.replace('/api', ''),
    });

    if (!response.ok) {
        console.error(response.body);
        return Promise.reject(response.body);
    }

    const {
        access_token: accessToken,
        expires_in: expiresIn,
        refresh_token: refreshToken,
    } = response.body as unknown as Record<string, string | number>;

    cookieStore.set('app.auth.access', accessToken as string, {
        ...COOKIES_SETTINGS,
        maxAge: parseInt(String(expiresIn), 10),
    });

    cookieStore.set('app.auth.refresh', refreshToken as string, {
        ...COOKIES_SETTINGS,
        maxAge: 31536000, // 1 year
    });

    return Promise.resolve({ status: 'authenticated' });
};


export const logOut = async (): Promise<ResponseType> => {
    const cookieStore = cookies();

    cookieStore.delete('app.auth.access');
    cookieStore.delete('app.auth.refresh');

    return Promise.resolve({ status: 'unauthenticated' });
};