
/**
 * A combination of the properties from the cast + crew of
 * the following endpoints:
 * - https://developers.themoviedb.org/3/tv/get-tv-credits
 * - https://developers.themoviedb.org/3/movies/get-movie-credits
 * - https://developers.themoviedb.org/3/people/get-person-tv-credits
 * - https://developers.themoviedb.org/3/people/get-person-movie-credits
 */
export interface CastPersonData {
    id: number;
    credit_id: string;
    popularity: number;
    adult?: boolean;
    cast_id?: number;
    character?: string;
    gender?: number;
    known_for_department?: string;
    name?: string;
    order?: number;
    original_name?: string;
    profile_path?: string | null;
    department?: string;
    job?: string;
    backdrop_path?: string | null;
    episode_count?: number;
    first_air_date?: string;
    genre_ids?: number[];
    origin_country?: string[];
    original_language?: string;
    overview?: string;
    poster_path?: string;
    vote_average?: number;
    vote_count?: number;
}

export interface CastData {
    cast: CastPersonData[];
    crew: CastPersonData[];
    id: number;
}

export default class CastModel {
    _cast: CastData['cast'];
    _crew: CastData['crew'];
    _id: CastData['id'];
    _type: 'cast';
    constructor(obj: CastData, type: 'cast'){
        this._cast = obj.cast;
        this._crew = obj.crew;
        this._id = obj.id;
        this._type = type;
    }

    get items() {
        return this._cast;
    }

    get type() {
        return this._type;
    }

    get cast() {
        return this._cast;
    }

    get crew() {
        return this._crew;
    }

    get id() {
        return this._id;
    }
}