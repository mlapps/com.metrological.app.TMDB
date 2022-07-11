export interface Person {
    adult: boolean
    cast_id: number
    character: string
    credit_id: string
    gender: number
    id: number
    known_for_department: string
    name: string
    order: number
    original_name: string
    popularity: number
    profile_path: string | null
    department?: string
    job?: string
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