'use client';

import { Button, Spinner } from 'react-bootstrap';
import * as React from 'react';
import { startRefresh } from './action';

const RefreshButton: React.FC = () => {
    const [loading, setLoading] = React.useState(false);

    const refresh = React.useCallback(() => {
        setLoading(true);

        startRefresh().finally(() => setLoading(false));
    }, []);

    return (
        <Button variant="primary" onClick={() => refresh()}>
            <Spinner animation="border" size="sm" hidden={!loading} className="me-2" />
            Refresh database
        </Button>
    );
};

export default RefreshButton;
