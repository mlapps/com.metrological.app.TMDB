/*
 * Copyright 2020 Metrological
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

export default class Details {
    constructor(obj){
        this._adult = obj.adult;
        this._backdrop_path = obj.backdrop_path;
        this._belong_to_collection = obj.belongs_to_collection;
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
        this._video = obj._video;
        this._vote_average = obj.vote_average;
        this._vote_count = obj.vote_count;
    }

    get adult() {
        return this._adult;
    }

    get background() {
        return this._backdrop_path;
    }

    get belongToCollection() {
        return this._belong_to_collection;
    }

    get budget() {
        return this._budget;
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