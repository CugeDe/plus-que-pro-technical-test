'use client';

import { Button, FormControl, InputGroup, Spinner } from 'react-bootstrap';
import * as React from 'react';

import styles from './search-bar.module.scss';
import Link from 'next/link';
import { fetchPage } from '@/app/movies/action';
import { HydraCollection } from '@/app/types/api';
import { Movie } from '@/app/types/movie';

const SearchBar = () => {
    const [loading, setLoading] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [results, setResults] = React.useState<HydraCollection<Movie>['hydra:member']>([]);
    const [search, setSearch] = React.useState('');

    React.useEffect(() => {
        if (search.length >= 3) {
            setLoading(true);

            fetchPage(1, { filters: { title: search } })
                .then((res) => (
                    res.status === 'success'
                        ? Promise.resolve(res.data)
                        : Promise.reject(res.data)
                ))
                .then((res) => setResults(res['hydra:member']))
                .finally(() => { setLoading(false); });
        }
    }, [search]);

    return (
        <div style={{ position: 'relative', height: '34px' }}>
            <InputGroup>
                <FormControl
                    onFocus={() => setOpen(true)}
                    placeholder="Type at least 3 characters to search a movie..."
                    onChange={(event) => {
                        const { value } = event.currentTarget;

                        setSearch(value.length >= 3 ? value : '');
                        if (value.length < 3) {
                            setResults([]);
                        }
                    }}
                />
                {open && (
                    <Button variant="secondary" onClick={() => setOpen(false)} style={{
                        borderLeft: 0 , backgroundColor: 'white', borderColor: '#dee2e6', color: 'rgb(187, 45, 59)',
                    }}>
                        x
                    </Button>
                )}
            </InputGroup>
            {open && (
                <div className={styles.results}>
                    {loading && (
                        <div className="w-100 text-center">
                            <Spinner animation="border" />
                        </div>
                    )}
                    {!loading && results.map((movie) => (
                        <Link
                            key={`search-result-movie-${movie.id}`}
                            href={`/movies/${movie.id}`}
                            className="text-decoration-none"
                            style={{ color: 'unset' }}
                            onClick={() => setOpen(false)}
                        >
                            <div className={styles.result}>
                                <span>{movie.title}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
