import { Col, Row } from 'react-bootstrap';
import * as React from 'react';

import { Genre } from '@/app/types/genre';
import { getClient } from '@/clients/main';
import { HydraCollection } from '@/app/types/api';
import { Movie } from '@/app/types/movie';

type MovieDetailsProps = {
  movie: Movie;
};

const MovieDetails = async ({ movie }: MovieDetailsProps) => {
    const res = await getClient().get(`genres`);
    const genres = res.ok ? (res.body as unknown as HydraCollection<Genre>)['hydra:member'] : [];

    return (
        <Row>
            {movie.poster && (
            <Col xs={12} md={4} lg={3} className="mb-3" style={{ position: 'relative', minHeight: '500px', height: '100%' }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={movie.poster}
                    alt={movie.title}
                    style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                    height={500}
                />
            </Col>
            )}
            <Col xs={12} md={8} lg={9} className="mb-3 text-center">
                <div className="mb-5">
                    <h1 className="mb-1">{movie.title}</h1>
                    <h5 className="text-muted">
                        {
                            movie.releaseDate
                                ? (new Date(movie.releaseDate))
                                    .toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })
                                : 'Unknown release date'
                        }
                        &nbsp;
                        ({movie.originalLanguage?.toLocaleUpperCase()})
                        &nbsp;
                        &bull;
                        &nbsp;
                        <span className="text-capitalize">
                            {genres.filter((genre) => movie.genres.includes(genre['@id'])).map((genre) => genre.name).join(', ')}
                        </span>
                    </h5>
                </div>
                <div className="text-start">
                    {movie.voteAverage && (
                        <p>
                            Vote average: {movie.voteAverage} ★
                            {movie.voteCount && (<span className="text-muted ms-1"><small>(on {movie.voteCount} votes)</small></span>)}
                        </p>
                    )}
                    <h5>Overview</h5>
                    <p>{movie.overview}</p>
                </div>
            </Col>
        </Row>
    );
};

export default MovieDetails;
