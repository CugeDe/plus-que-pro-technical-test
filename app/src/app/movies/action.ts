'use server';

import { getClient } from "@/clients/main";
import { ActionResponse } from "../types/server-action";
import { HydraCollection } from "../types/api";
import { Movie } from "./movie";

type Response = ActionResponse<HydraCollection<Movie>>;

export const fetchPage = async (page = 1): Promise<Response> => {
    const response = await getClient().get(`movies?page=${page}`);

    return {
        status: response.ok ? 'success' : 'error',
        data: response.body as unknown as Response['data'],
    };
};
