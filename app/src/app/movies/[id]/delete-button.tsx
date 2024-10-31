'use client';

import { Button, Modal, Spinner } from 'react-bootstrap';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Movie } from '@/app/types/movie';
import useSession from '@/security/use-session';
import { deleteMovie as deleteAction } from './action';

type DeleteButtonProps = {
    movie: Movie;
};

const DeleteButton: React.FC<DeleteButtonProps> = ({ movie }) => {
    const [loading, setLoading] = React.useState(false);
    const { status, loading: sessionLoading } = useSession();
    const router = useRouter();
    const [open, setOpen] = React.useState(false);

    const deleteMovie = React.useCallback(async () => {
        setLoading(true);

        deleteAction(movie.id)
            .then((res) => (
                res.status === 'success'
                    ? Promise.resolve(res.data)
                    : Promise.reject(res.data)
            )).then(() => {
                // Redirect to the movies list
                router.push('/movies');
            })
            .catch((error) => {
                console.error('An error occurred while deleting the movie:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [movie, router]);

    if (sessionLoading || status === 'unauthenticated') {
        return null;
    }

    return (
        <>
            <Button variant="danger" className="mb-2" onClick={() => setOpen(true)}>
                Delete
            </Button>
            <Modal show={open} onHide={() => setOpen(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete movie</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this movie?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="danger" onClick={() => deleteMovie()}>
                        {loading && <Spinner animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />}
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default DeleteButton;
