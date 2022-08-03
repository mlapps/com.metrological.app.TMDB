import { notEmpty } from "../tools";
import { Genre } from "../types";

export interface MovieData {
    adult: boolean;
    genre_ids: number[];
    backdrop_path: string;
    id: number;
    original_language: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}


export default class MovieModel {
    _adult: MovieData['adult'];
    _backdrop_path: MovieData['backdrop_path'];
    _genres: Genre[];
    _id: MovieData['id'];
    _original_language: MovieData['original_language'];
    _overview: MovieData['overview'];
    _popularity: MovieData['popularity'];
    _poster_path: MovieData['poster_path'];
    _release_date: MovieData['release_date'];
    _title: MovieData['title'];
    _type: 'movie';
    _video: MovieData['video'];
    _vote_average: MovieData['vote_average'];
    _vote_count: MovieData['vote_count'];

    constructor(obj: MovieData, genres: Genre[]){
        this._adult = obj.adult;
        this._backdrop_path = obj.backdrop_path;
        this._genres = obj.genre_ids.map(id => {
            return genres.find(genre => {
                return genre.id === id;
            });
        }).filter(notEmpty);
        this._id = obj.id;
        this._original_language = obj.original_language;
        this._overview = obj.overview;
        this._popularity = obj.popularity;
        this._poster_path = obj.poster_path;
        this._release_date = obj.release_date;
        this._title = obj.title;
        this._type = "movie";
        this._video = obj.video;
        this._vote_average = obj.vote_average;
        this._vote_count = obj.vote_count;
    }

    get adult() {
        return this._adult;
    }

    get background() {
        return this._backdrop_path;
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

    get originalLanguage() {
        return this._original_language;
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

    get title() {
        return this._title;
    }

    get type() {
        return this._type;
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