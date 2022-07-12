export interface Person {
    adult: boolean;
    cast_id: number;
    character: string;
    credit_id: string;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    order: number;
    original_name: string;
    popularity: number;
    profile_path: string | null;
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
    cast: Person[];
    crew: Person[];
    id: number;
}

export default class Cast {
    _cast: Person[];
    _crew: Person[];
    _id: number;
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