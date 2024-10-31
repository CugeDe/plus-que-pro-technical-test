'use server';

import { getClient } from "@/clients/main";
import { FormValues } from "./type";

export const register = async (data: FormValues) => {
    const response = await getClient().post('register', { json: data });

    return {
        status: response.ok ? 'success' : 'error',
        data: response.body
    };
};
