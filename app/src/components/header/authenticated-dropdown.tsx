import { Nav, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import Link from 'next/link';

import useSession from '@/security/use-session';

const AuthenticatedDropdown = () => {
    const { logOut, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const disconnect = React.useCallback(() => {
        setLoading(true);

        logOut().finally(() => {
            setLoading(false);
            router.push('/');
        });
    }, [logOut, router]);

    if (status !== 'authenticated') {
        return (
            <Link href="/login" passHref legacyBehavior>
                <Nav.Link>
                    Login
                </Nav.Link>
            </Link>
        );
    }

    return (
        <NavDropdown title="User" id="user-dropdown">
            <Link href="/administration" passHref legacyBehavior>
                <NavDropdown.Item href="">Go to administration</NavDropdown.Item>
            </Link>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={disconnect} disabled={loading}>
                Logout
            </NavDropdown.Item>
        </NavDropdown>
    );
};

    export default AuthenticatedDropdown;
