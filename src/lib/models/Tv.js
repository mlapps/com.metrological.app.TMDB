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