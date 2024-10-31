/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import { Col, Row, Spinner } from 'react-bootstrap';
import * as React from 'react';

import { fetchPage } from './action';
import { HydraCollection } from '../types/api';
import { Movie } from './movie';
import MovieCard from './movie-card';

import styles from './list.module.scss';

type ListProps = {
    pages: HydraCollection<Movie>[];
};

const List: React.FC<ListProps> = ({ pages }) => {
    const [chunks, setChunks] = React.useState(pages);
    const [loading, setLoading] = React.useState(true);
    const [page, setPage] = React.useState(1);

    const endReached = React.useMemo(() => (
        chunks.length && chunks[chunks.length - 1]['hydra:view']?.['hydra:next'] === undefined
    ), [chunks]);

    const handleInfiniteScroll = React.useCallback(async () => {
        if (endReached) {
            return;
        }

        try {
            if (
                window.innerHeight + window.document.documentElement.scrollTop + 1 >=
                window.document.documentElement.scrollHeight
            ) {
                setLoading(true);
                setPage((prev) => prev + 1);
            }
        } catch (error) {
            console.error(error);
        }
    }, [endReached]);

    React.useEffect(() => {
        // First page is already loaded in the parent component
        if (page > 1) {
            fetchPage(page)
                .then((response) => (
                    response.status === 'success'
                        ? Promise.resolve(response.data)
                        : Promise.reject(response.data)
                ))
                .then((data) => {
                    setChunks((prev) => [...prev, data]);
                })
                .catch(() => {
                    setEndReached(true);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [page]);

    const items = React.useMemo(() => {
        return chunks.reduce((acc, page) => {
            return [...acc, ...page['hydra:member']];
        }, [] as (typeof pages)[0]['hydra:member']);
    }, [chunks]);

    React.useEffect(() => {
        window.addEventListener("scroll", handleInfiniteScroll);

        return () => window.removeEventListener("scroll", handleInfiniteScroll);
    }, [handleInfiniteScroll]);

    return (
        <Row>
            <Col>
                <div className={styles.container}>
                    {items.map((movie) => (
                        <MovieCard key={`movie-${movie.id}`} movie={movie} />
                    ))}
                </div>
                {loading && (
                    <div className="text-center my-3">
                        <Spinner animation="border" role="status" size="sm" />
                        <span className="sr-only ms-2">Loading...</span>
                    </div>
                )}
                {endReached && (
                    <div className="text-center my-3">
                        <span className="text-muted">No more movies to show</span>
                    </div>
                )}
            </Col>
        </Row>
    );
};

export default List;
