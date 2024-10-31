'use client';

import { Button } from 'react-bootstrap';
import * as React from 'react';
import Link from 'next/link';

import { Movie } from '@/app/types/movie';
import useSession from '@/security/use-session';

type EditButtonProps = {
    movie: Movie;
};

const EditButton: React.FC<EditButtonProps> = ({ movie }) => {
    const { status, loading } = useSession();

    if (loading || status === 'unauthenticated') {
        return null;
    }

    return (
        <Link href={`/administration/movies/${movie.id}`} passHref legacyBehavior>
            <Button variant="primary" className="mb-2">Edit</Button>
        </Link>
    );
};

export default EditButton;
