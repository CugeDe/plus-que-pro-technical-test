'use server';

import { ActionResponse } from "@/app/types/server-action";
import { getClient } from "@/clients/main"
import { cookies } from "next/headers";

export const startRefresh = async (): Promise<ActionResponse<unknown>> => {
    const accessCookie = cookies().get('app.auth.access');
    const accessToken = accessCookie?.value;
    if (!accessToken) {
        return {
            status: 'error',
            data: 'You are not authenticated',
        };
    }

    const res = await getClient().post('refresh-database', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    return {
        status: res.ok ? 'success' : 'error',
        data: res.body as unknown,
    };
};
