export interface ShowDetails {
  backdrop_path: string;
  created_by: CreatedBy[];
  episode_run_time: number[];
  first_air_date: Date;
  genres: Genre[];
  homepage: string;
  id: string;
  in_production: boolean;
  languages: string[];
  last_air_date: Date;
  last_episode_to_air: Episode;
  name: string;
  networks: Network[];
  next_episode_to_air: Episode;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: ProductionCompany[];
  seasons: Season[];
  status: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface CreatedBy {
  credit_id: string;
  gender: string;
  id: string;
  name: string;
  profile_path: string;
}

export interface Genre {
  id: string;
  name: string;
}

export interface Episode {
  air_date: Date;
  episode_number: number;
  id: string;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  show_id: string;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  id: string;
  logo_path: string;
  name: string;
  origiin_country: string;
}

export interface ProductionCompany {
  id: string;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface Season {
  air_date: Date;
  episode_count: number;
  id: string;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface Intro {
  name: string;
  overview: string;
}


