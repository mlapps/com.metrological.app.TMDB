import { MovieData } from "./models/Movie";
import { TvData } from "./models/Tv";

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

export type EntityData = TvData | MovieData;
