export default class Tv {
    constructor(obj,genres){
        this._backdrop_path = obj.backdrop_path;
        this._first_air_date = obj.first_air_date;
        this._genres = obj.genre_ids.map(id => {
            return genres.find(genre => {
                return genre.id === id;
            });
        }).filter(item => item);
        this._id = obj.id;
        this._name = obj.name;
        this._origin_country = obj.origin_country;
        this._original_language = obj.original_language;
        this._original_name = obj.original_name;
        this._overview = obj.overview;
        this._popularity = obj.popularity;
        this._poster_path = obj.poster_path;
        this._title = obj.name;
        this._type = "tv";
        this._vote_average = obj.vote_average;
        this._vote_count = obj.vote_count;
    }

    get background() {
        return this._backdrop_path;
    }

    get firstAirDate() {
        return this._first_air_date;
    }

    get genres(){
        return this._genres;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get originalCountry() {
        return this._origin_country;
    }

    get originalLanguage() {
        return this._original_language;
    }

    get originalName() {
        return this._original_name;
    }

    get overview() {
        return this._overview;
    }

    get title() {
        return this._title;
    }

    get type() {
        return this._type;
    }

    get popularity() {
        return this._popularity;
    }

    get poster() {
        return this._poster_path;
    }

    get voteAverage() {
        return this._vote_average;
    }

    get voteCount() {
        return this._vote_count;
    }
}