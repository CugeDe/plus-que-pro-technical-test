'use server';

import { cookies } from "next/headers";

import { getClient } from "@/clients/main"
import { revalidatePath } from "next/cache";

export const deleteMovie = async (movieId: number) => {
    const accessCookie = cookies().get('app.auth.access');
    const accessToken = accessCookie?.value;
    if (!accessToken) {
        return {
            status: 'error',
            data: 'You are not authenticated',
        };
    }

    const response = await getClient().delete(`movies/${movieId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        },
    });

    if (!response.ok) {
        return {
            status: 'error',
            data: response.body,
        };
    }

    revalidatePath('/movies');

    return {
        status: 'success',
        data: response.body,
    };
};
