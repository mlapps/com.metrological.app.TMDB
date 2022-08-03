/**
 * https://developers.themoviedb.org/3/people/get-person-details
 */
export interface PersonData {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string | null;
    deathday: string | null;
    gender: 0 | 1 | 2 | 3;
    homepage: string | null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string | null;
    popularity: number;
    profile_path: string | null;
}

export default class PersonModel {
    _adult: PersonData['adult'];
    _also_known_as: PersonData['also_known_as'];
    _biography: PersonData['biography'];
    _birthday: PersonData['birthday'];
    _deathday: PersonData['deathday'];
    _gender: PersonData['gender'];
    _homepage: PersonData['homepage'];
    _id: PersonData['id'];
    _imdb_id: PersonData['imdb_id'];
    _known_for_department: PersonData['known_for_department'];
    _name: PersonData['name'];
    _place_of_birth: PersonData['place_of_birth'];
    _popularity: PersonData['popularity'];
    _profile_path: PersonData['profile_path'];

    constructor(obj: PersonData){
        this._adult = obj.adult;
        this._also_known_as = obj.also_known_as;
        this._biography = obj.biography;
        this._birthday = obj.birthday;
        this._deathday = obj.deathday;
        this._gender = obj.gender;
        this._homepage = obj.homepage;
        this._id = obj.id;
        this._imdb_id = obj.imdb_id;
        this._known_for_department = obj.known_for_department;
        this._name = obj.name;
        this._place_of_birth = obj.place_of_birth;
        this._popularity = obj.popularity;
        this._profile_path = obj.profile_path;
    }

    get adult() {
        return this._adult;
    }

    get alsoKnownAs() {
        return this._also_known_as;
    }

    get biography() {
        return this._biography;
    }

    get birthday() {
        if (!this._birthday) return '';
        const date = new Date(this._birthday);
        return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
    }

    get deathday() {
        return this._deathday;
    }

    get gender() {
        return this._gender;
    }

    get homepage() {
        return this._homepage;
    }

    get id() {
        return this._id;
    }

    get imdbId() {
        return this._imdb_id;
    }

    get knowForDepartment() {
        return this._known_for_department;
    }

    get name() {
        return this._name;
    }

    get placeOfBirth() {
        return this._place_of_birth;
    }

    get popularity() {
        return this._popularity;
    }

    get profilePath() {
        return this._profile_path;
    }
}