export type Movie = {
    id:               number;
    adult:            boolean;
    backdrop:         string | null;
    genres:           string[];
    mediaType:        string | null;
    originalLanguage: string | null;
    originalTitle:    string;
    overview:         string;
    popularity:       number | null;
    poster:           string | null;
    releaseDate:      string | null;
    title:            string;
    voteAverage:      number | null;
    voteCount:        number | null;
}