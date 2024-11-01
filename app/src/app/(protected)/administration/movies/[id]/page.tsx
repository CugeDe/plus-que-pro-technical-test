import { Col, Container, Row } from 'react-bootstrap';
import * as React from 'react';

import { getClient } from '@/clients/main';
import { Movie } from '@/app/types/movie';
import MovieForm from './form';
import { HydraCollection } from '@/app/types/api';
import { Genre } from '@/app/types/genre';

type PageProps = {
    params: Record<string, string | string[]>;
};

const Page = async ({ params }: PageProps) => {
    const { id } = params;

    const genres = (await getClient().get('genres')).body as unknown as HydraCollection<Genre>;

    let content: React.ReactNode = null;

    const res = await getClient().get(`movies/${id as string}`);
    if (!res.ok) {
        content = <div>Movie not found</div>;
    } else {
        content = <MovieForm movie={res.body as unknown as Movie} genres={genres['hydra:member']} />;
    }

    return (
        <Container>
            <Row>
                <Col>
                    {content}
                </Col>
            </Row>
        </Container>
    );
};

export default Page;
