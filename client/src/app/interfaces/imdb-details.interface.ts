export interface ImdbDetails {
    title: string;
    rated: string;
    released: Date;
    runtime: number;
    genres: string;
    director: string;
    writer: string;
    actors: string;
    plot: string;
    languages: string;
    country: string;
    awards: string;
    poster: string;
    ratings: Rating[];
    metascore: string;
    rating: number;
    votes: number;
    imdbid: string;
    type: string;
    totalseasons: number;
    response: boolean;
    name: string;
    series: boolean;
    imdburl: string;
    start_year: number;
}

export interface Rating {
    Source: string;
    Value: string;
}