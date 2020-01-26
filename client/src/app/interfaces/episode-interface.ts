export interface EpisodeImages {
    id: string;
    stills: StillImage[];
}

export interface StillImage {
    aspect_ratio: number;
    file_path: string;
    height: number;
    iso_639_1: string;
    vote_average: number;
    vote_count: number;
    width: number;
}