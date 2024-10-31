'use server';

import { signIn } from 'next-auth/react';

import { FormValues } from './type';

export const login = async (data: FormValues) => {
    return signIn('credentials', data);
};

