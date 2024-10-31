import { Col, Container, Row } from 'react-bootstrap';
import * as React from 'react';
import RefreshButton from './refresh-button';

const Page = () => {
    return (
        <Container fluid>
            <Row>
                <Col xs={12} md={{  offset: 1, span: 10  }} lg={{ offset: 2, span: 8 }}>
                    <h1 className="text-center">Administration</h1>
                    <div className="text-end">
                        <RefreshButton />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Page;
