'use client';

import { Button, Form, Spinner } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { Genre } from '@/app/types/genre';
import { HydraItem } from '@/app/types/api';
import { Movie } from '@/app/types/movie';
import { updateMovie as updateAction } from './action';

type MovieFormProps = {
    genres: HydraItem<Genre>[];
    movie: Movie;
};

const MovieForm = ({ movie }: MovieFormProps) => {
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();
    const methods = useForm({
        defaultValues: {
            title: movie.title,
            originalTitle: movie.originalTitle,
            overview: movie.overview,
        },
    });
    const { handleSubmit } = methods;

    const onSubmit = React.useCallback((data: Record<string, string | string[]>) => {
        setLoading(true);

        updateAction(movie.id, data)
            .then((res) => (
                res.status === 'success'
                    ? Promise.resolve(res.data)
                    : Promise.reject(res.data)
            ))
            .then(() => {
                console.debug('[OK] Successfully updated the movie with data:', data);
                router.push(`/movies/${movie.id}`);
            })
            .finally(() => setLoading(false));
    }, [movie, router]);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control {...methods.register('title')} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="originalTitle">
                <Form.Label>Original title</Form.Label>
                <Form.Control {...methods.register('originalTitle')} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="overview">
                <Form.Label>Overview</Form.Label>
                <Form.Control as="textarea" {...methods.register('overview')} />
            </Form.Group>
            <Form.Group controlId="submit" className="text-center d-flex">
                <Button type="submit" id="submit" className="w-100" disabled={loading}>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" hidden={!loading} className="me-2" />
                    Save
                </Button>
            </Form.Group>
        </Form>
    );
};

export default MovieForm;
