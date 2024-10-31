'use server';

import { getClient } from "@/clients/main";
import { ActionResponse } from "../types/server-action";
import { HydraCollection } from "../types/api";
import { Movie } from "@/app/types/movie";

type Response = ActionResponse<HydraCollection<Movie>>;

type Options = {
    itemsPerPage?: number;
    filters?: Record<string, string>
};

export const fetchPage = async (page = 1, options?: Options): Promise<Response> => {
    const search = new URLSearchParams();

    search.set('page', String(page));
    search.set('sort[popularity]', 'desc');
    search.set('sort[voteCount]', 'desc');
    if (options?.itemsPerPage) {
        search.set('itemsPerPage', String(options.itemsPerPage));
    }
    if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
            search.set(`filter[${key}]`, String(value));
        });
    }

    const response = await getClient().get(`movies?${search.toString()}`);

    return {
        status: response.ok ? 'success' : 'error',
        data: response.body as unknown as Response['data'],
    };
};
