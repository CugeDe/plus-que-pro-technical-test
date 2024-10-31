import { Col, Container, Row } from 'react-bootstrap';
import * as React from 'react';

import Form from './form';

const Page = async () => {
    return (
        <Container>
            <Row>
                <Col xs={12} md={{ offset: 3, span: 6 }}>
                    <h1 className="text-center">Login</h1>
                    <Form />
                </Col>
            </Row>
        </Container>
    );
};

export default Page;
