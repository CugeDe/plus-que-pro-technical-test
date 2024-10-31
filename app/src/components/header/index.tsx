'use client';

import { Container, Nav, Navbar } from 'react-bootstrap';
import * as React from 'react';
import Link from 'next/link';

import AuthenticatedDropdown from './authenticated-dropdown';
import SearchBar from './search-bar';
import { usePathname } from 'next/navigation';

const Header = () => {
    const pathname = usePathname();

    return (
        <Navbar expand="lg" className="bg-body-tertiary mb-3">
            <Container>
            <Link href="/" passHref legacyBehavior>
                <Navbar.Brand>TMDB - Plus que pro</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="main-navigation" />
            <Navbar.Collapse id="main-navigation">
                <Nav className="me-auto">
                    <Link href="/movies" passHref legacyBehavior>
                        <Nav.Link>Movies</Nav.Link>
                    </Link>
                </Nav>
                {pathname.startsWith('/movies') && (
                    <Nav className="w-100">
                        <Nav.Item className="w-100">
                            <SearchBar />
                        </Nav.Item>
                    </Nav>
                )}
                <Nav className='ms-auto'>
                    <AuthenticatedDropdown />
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
}

export default Header;
