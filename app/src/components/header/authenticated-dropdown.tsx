import { Nav, NavDropdown } from 'react-bootstrap';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import * as React from 'react';
import Link from 'next/link';

const AuthenticatedDropdown = () => {
    const { status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    const disconnect = React.useCallback(() => {
        setLoading(true);

        signOut({ redirect: false }).finally(() => {
            setLoading(false);
            router.push('/');
        });
    }, [router]);

    if (status !== 'authenticated') {
        return (
            <Nav.Link onClick={() => signIn('credentials', { redirect: true })}>
                Login
            </Nav.Link>
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
