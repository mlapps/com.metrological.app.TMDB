import { notEmpty } from "../tools";
import { Genre } from "../types";

export interface TvData {
    backdrop_path: string;
    first_air_date: string;
    genre_ids: number[];
    id: number;
    name: string;
    origin_country: string;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    // title: string;
    type: string;
    vote_average: number;
    vote_count: number;
}

export default class Tv {
    _backdrop_path: any;
    _first_air_date: any;
    _genres: Genre[];
    _id: any;
    _name: string;
    _origin_country: any;
    _original_language: any;
    _original_name: any;
    _overview: any;
    _popularity: any;
    _poster_path: any;
    _title: string;
    _type: string;
    _vote_average: any;
    _vote_count: any;

    constructor(obj: TvData,genres: Genre[]){
        this._backdrop_path = obj.backdrop_path;
        this._first_air_date = obj.first_air_date;
        this._genres = obj.genre_ids.map(id => {
            return genres.find(genre => {
                return genre.id === id;
            });
        }).filter(notEmpty);
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

    get formattedReleaseDate() {
        if (!this._first_air_date) {
            return `Date not available`;
        } else {
            const date = new Date(this._first_air_date);
            return `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()}, ${date.getFullYear()}`;
        }

    }

    get genres(){
        return this._genres;
    }

    get genresAsString(){
        let genres = ``;
        this._genres.forEach((genre, index) => {
            if (index > 0) {
                genres += ` | ${genre.name}`
            } else {
                genres += `${genre.name}`
            }
        });
        return genres === '' ? "-" : genres;
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