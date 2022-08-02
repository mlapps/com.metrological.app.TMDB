import { CastPersonData } from "./models/CastModel";
import { MovieData } from "./models/MovieModel";
import { TvData } from "./models/TvModel";

export interface DiscoverResponse {

}

export interface SimilarResponse {

}

export interface GenresResponse {
  genres: Genre[];
}

export interface Genre {
  id: unknown;
  name: string;
}

export type EntityData = TvData | MovieData | CastPersonData;
