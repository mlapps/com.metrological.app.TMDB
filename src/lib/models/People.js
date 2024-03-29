export default class People {
    constructor(obj){
        this._adult = obj.adult;
        this._also_known_as = obj.also_known_as;
        this._biography = obj.biography;
        this._birthday = obj.birthday;
        this._deathday = obj.deathday;
        this._gender = obj.gender;
        this._homepage = obj.homepage;
        this._id = obj.id;
        this._imdb_id = obj.id;
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