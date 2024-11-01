'use server';

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { getClient } from "@/clients/main";

export const updateMovie = async (id: number, data: Record<string, string | string[]>) => {
    const accessCookie = cookies().get('app.auth.access');
    const accessToken = accessCookie?.value;
    if (!accessToken) {
        return {
            status: 'error',
            data: 'You are not authenticated',
        };
    }

    const res = await getClient().patch(`movies/${id}`, {
        json: data,
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/merge-patch+json',
        },
    });

    if (!res.ok) {
        return {
            status: 'error',
            data: res.body,
        };
    }

    revalidatePath("/movies");
    revalidatePath(`/movies/${id}`);

    return {
        status: 'success',
        data: res.body,
    };
}