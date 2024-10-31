import { Button, Card } from 'react-bootstrap';
import * as React from 'react';
import Image from 'next/image';

import { HydraItem } from '../types/api';
import { Movie } from './movie';

import styles from './movie-card.module.scss';
import Link from 'next/link';

type MovieCardProps = {
    movie: HydraItem<Movie>;
};

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
    return (
        <Card className={styles.card}>
            {movie.backdrop && (
                <div className="card-img-top" style={{ height: '256px', position: 'relative' }}>
                    <Image alt={movie.title} src={movie.backdrop} layout="fill" />
                </div>
            )}
            <Card.Header className="text-center">
                {movie.title}
            </Card.Header>
            <Card.Body>
                <p>{movie.overview}</p>
                <p>Release: {movie.releaseDate}</p>
            </Card.Body>
            <Card.Footer>
                <Link href={`/movies/${movie.id}`}>
                    <Button variant="primary" className="w-100">More details ?</Button>
                </Link>
            </Card.Footer>
        </Card>
    );
};

export default MovieCard;
