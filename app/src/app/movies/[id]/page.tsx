import { Col, Container, Row } from 'react-bootstrap';
import * as React from 'react';

import { fetchPage } from '../action';
import { getClient } from '@/clients/main';
import { HydraCollection } from '@/app/types/api';
import { Movie } from '@/app/types/movie';
import MovieDetails from './movie-details';

type PageProps = {
    params: Record<string, string | string[]>;
};

const Page = async ({ params }: PageProps) => {
    const { id } = params;

    let content: React.ReactNode = null;

    const res = await getClient().get(`movies/${id as string}`);
    if (!res.ok) {
        content = <div>Movie not found</div>;
    } else {
        content = <MovieDetails movie={res.body as unknown as Movie} />;
    }

    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={{ offset: 1, span: 10 }}>
                    {content}
                </Col>
            </Row>
        </Container>
    );
};

/**
 * This function gets called at build time.
 *
 * It could be optimized a lot by putting all the promises in an array and using
 * Promise.all to fetch all the pages at once. However, this is a simple example
 * and we don't need to optimize it at the moment.
 */
export async function generateStaticParams() {
    if (process.env.NODE_ENV === 'development') {
        return [];
    }

    let page: number | null = 1;
    const ids: HydraCollection<Movie>['hydra:member'][0]['id'][] = [];

    do {
        const res = await fetchPage(page, { itemsPerPage: 100 });

        if (res.status === 'error') {
            continue;
        }

        ids.push(...res.data['hydra:member'].map((movie: Movie) => movie.id));

        page = Boolean(res.data['hydra:view']?.['hydra:next']) ? page + 1 : null;
    }
    while (page !== null);

    return ids.map((id) => ({ params: { id: String(id) } }));
};

export const dynamicParams = true;
export const revalidate = 60 * 60; // 1 hour

export default Page;
