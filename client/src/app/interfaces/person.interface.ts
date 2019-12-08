export interface Person {
  character: string;
  credit_id: string;
  id: string;
  name: string;
  gender: number;
  order: number;
  profile_path: string;
}

export interface PersonDetails {
  birthday: Date;
  known_for_department: string;
  deathday: Date | null;
  id: string;
  name: string;
  also_known_as: string[];
  gender: number;
  biography: string;
  popularity: number;
  place_of_birth: string;
  profile_path: string;
  adult: boolean;
  imdb_id: string;
  homepage: string;
}

export interface Credits {
  cast: Array<Person>;
  crew: Array<Person>;
}
