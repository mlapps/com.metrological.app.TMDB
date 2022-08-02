import { Genre } from "../types";

export interface DetailsData {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: any; // null or object, apparently
    budget: number;
    genres: Genre[];
    homepage: string | null;
    id: number;
    imdb_id: string | null;
    original_language: string;
    original_title: string;
    overview: string | null;
    popularity: number;
    poster_path: string | null;
    production_companies: Array<{
        name: string;
        id: number;
        logo_path: string | null;
        origin_company: string;
    }>;
    production_countries: Array<{
        iso_3166_1: string;
        name: string;
    }>;
    release_date: string;
    revenue: number;
    runtime: number | null;
    spoken_languages: Array<{
        iso_639_1: string;
        name: string;
    }>;
    status: 'Rumored' | 'Planned' | 'In Production' | 'Post Production' | 'Released' | 'Canceled';
    tagline: string | null;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;

    // Extras (TV Show Apparently?)
    name: string;
    first_air_date: string;
}

export default class DetailsModel {
    _adult: DetailsData['adult'];
    _backdrop_path: DetailsData['backdrop_path'];
    _belongs_to_collection: DetailsData['belongs_to_collection'];
    _budget: DetailsData['budget'];
    _genres: DetailsData['genres'];
    _homepage: DetailsData['homepage'];
    _id: DetailsData['id'];
    _imdb_id: DetailsData['imdb_id'];
    _original_language: DetailsData['original_language'];
    _original_title: DetailsData['original_title'];
    _overview: DetailsData['overview'];
    _popularity: DetailsData['popularity'];
    _poster_path: DetailsData['poster_path'];
    _production_companies: DetailsData['production_companies'];
    _production_countries: DetailsData['production_countries'];
    _release_date: DetailsData['release_date'];
    _revenue: DetailsData['revenue'];
    _runtime: DetailsData['runtime'];
    _spoken_languages: DetailsData['spoken_languages'];
    _status: DetailsData['status'];
    _tagline: DetailsData['tagline'];
    _title: DetailsData['title'];
    _video: DetailsData['video'];
    _vote_average: DetailsData['vote_average'];
    _vote_count: DetailsData['vote_count'];

    constructor(obj: DetailsData){
        this._adult = obj.adult;
        this._backdrop_path = obj.backdrop_path;
        this._belongs_to_collection = obj.belongs_to_collection;
        this._budget = obj.budget;
        this._genres = obj.genres;
        this._homepage = obj.homepage;
        this._id = obj.id;
        this._imdb_id = obj.imdb_id;
        this._original_language = obj.original_language;
        this._original_title = obj.original_title;
        this._overview = obj.overview;
        this._popularity = obj.popularity;
        this._poster_path = obj.poster_path;
        this._production_companies = obj.production_companies;
        this._production_countries = obj.production_countries;
        this._release_date = obj.release_date || obj.first_air_date;
        this._revenue = obj.revenue;
        this._runtime = obj.runtime;
        this._spoken_languages = obj.spoken_languages;
        this._status = obj.status;
        this._tagline = obj.tagline;
        this._title = obj.title || obj.name;
        this._vote_average = obj.vote_average;
        this._vote_count = obj.vote_count;
        this._video = obj.video;
    }

    get adult() {
        return this._adult;
    }

    get background() {
        return this._backdrop_path;
    }

    get belongToCollection() {
        return this._belongs_to_collection;
    }

    get budget() {
        return this._budget;
    }

    get genres(){
        return this._genres;
    }

    get genresAsString(){
        let genres = ``;
        (this._genres || []).forEach((genre, index) => {
            if (index > 0) {
                genres += ` | ${genre.name}`
            } else {
                genres += `${genre.name}`
            }
        });
        return genres === '' ? "-" : genres;
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

    get originalLanguage() {
        return this._original_language;
    }

    get originalTitle() {
        return this._original_title;
    }

    get overview() {
        return this._overview;
    }

    get popularity() {
        return this._popularity;
    }

    get poster() {
        return this._poster_path;
    }

    get productionCompanies() {
        return this._production_companies;
    }

    get productionCountries() {
        return this._production_countries;
    }

    get releaseDate() {
        return this._release_date;
    }

    get formattedReleaseDate() {
        if (!this._release_date) {
            return `Date not available`;
        } else {
            const date = new Date(this._release_date);
            return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()} ${date.getFullYear()}`;
        }
    }

    get revenue() {
        return this._revenue;
    }

    get runtime() {
        return this._runtime;
    }

    get spokenLanguages() {
        return this._spoken_languages;
    }

    get status() {
        return this._status;
    }

    get tagline() {
        return this._tagline;
    }

    get title() {
        return this._title;
    }

    get video() {
        return this._video;
    }

    get voteAverage() {
        return this._vote_average;
    }

    get voteCount() {
        return this._vote_count;
    }
}