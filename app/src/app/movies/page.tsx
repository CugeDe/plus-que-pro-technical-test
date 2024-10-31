import { Col, Container, Row } from 'react-bootstrap';
import * as React from 'react';

import { getClient } from '@/clients/main';
import { HydraCollection } from '../types/api';
import { Movie } from './movie';
import List from './list';

const Page = async () => {
    const firstPage = (await getClient().get('movies')).body as unknown as HydraCollection<Movie>;

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

export default Page;
