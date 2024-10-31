import { Col, Container, Row } from 'react-bootstrap';
import * as React from 'react';
import { getClient } from '@/clients/main';
import MovieDetails from './movie-details';
import { Movie } from '../movie';
import { fetchPage } from '../action';
import { HydraCollection } from '@/app/types/api';

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

export async function generateStaticPaths() {
    let page: number | null = 1;
    const pages: HydraCollection<Movie>['hydra:member'] = [];

    do {
        const res = await fetchPage(page);

        if (res.status === 'error') {
            continue;
        }

        pages.push(...res.data['hydra:member']);

        page = res.data['hydra:view']['hydra:next'] !== null ? page + 1 : null;
    }
    while (page !== null);

    return (res.body as unknown as Movie[]).map((movie) => ({
        params: {
            id: movie.id.toString(),
        },
    }));
}

export async function generateStaticParams() {
    return 
}

export default Page;
