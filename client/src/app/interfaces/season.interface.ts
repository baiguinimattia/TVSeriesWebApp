export interface SeasonDetailed {
    _id: string;
    air_date: Date;
    name: string;
    overview: string;
    id: string;
    poster_path: string;
    season_number: number;
    episodes: EpisodeDetailed[];
}

export interface EpisodeDetailed {
    air_date: Date;
    episode_number: number;
    id: string;
    name: string;
    overview: string;
    production_code: string;
    season_number: number;
    show_id: string;
    vote_average: number;
    vote_count: number;
    crew: CrewMember[];
    guest_stars: GuestStar[];
}

export interface CrewMember {
    id: string;
    credit_id: string;
    name: string;
    department: string;
    job: string;
    gender: Gender;
    profile_path: string;
}

export interface GuestStar {
    id: string;
    name: string;
    credit_id: string;
    character: string;
    order: number;
    gender: Gender;
    profile_path: string;
}

export enum Gender {
    male = 1,
    female = 2
}