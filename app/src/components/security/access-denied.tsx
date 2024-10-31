'use client';

import { Col, Row, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import * as React from 'react'

const AccessDenied = () => {
  const router = useRouter();

  React.useEffect(() => {
    setTimeout(() => {
        router.push('/login');
    }, 2000);
  }, [router]);

  return (
        <Row>
          <Col className="text-center">
            <h1>Access Denied</h1>
            <p>You must be signed in to access this page.</p>
            <p className="mt-5">
              <Spinner animation="border" className="ms-2" size="sm" />
              <br />
              Redirecting you to the login page...
            </p>
          </Col>
        </Row>
  );
};

export default AccessDenied;
