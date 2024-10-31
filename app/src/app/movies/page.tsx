import { Col, Container, Row } from 'react-bootstrap';
import * as React from 'react';

import { HydraCollection } from '../types/api';
import List from './list';
import { fetchPage } from './action';
import { Movie } from '@/app/types/movie';

const Page = async () => {
    const res = await fetchPage(1);

    const firstPage = (res.status === 'success' ? res.data : []) as HydraCollection<Movie>;

    return (
        <Container fluid>
            <Row>
                <Col xs={12}  md={{ offset: 1, span: 10 }}>
                    <h1 className="text-center">Movies</h1>
                    <List pages={[firstPage]} />
                </Col>
            </Row>
        </Container>
    );
};

export async function generateStaticParams() {
    return [];
}

export default Page;
