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

const apiKey = '66683917a94e703e14ca150023f4ea7c';
const base = 'https://api.themoviedb.org/3';

export const getPopularUrls = async (type)=>{
    return [
        `genre/${type}/list`,
        `discover/${type}`,
    ].map((url)=>{
        return fetch(`${base}/${url}?api_key=${apiKey}&with_companies=7|33&vote_average.gte=7`)
    });
}

export const getDetailUrl = async (type, id)=> {
    return fetch(`${base}/${type}/${id}?api_key=${apiKey}`);
};

export const getCreditsUrl = async (type, id)=> {
    return fetch(`${base}/${type}/${id}/credits?api_key=${apiKey}`);
};

export const getSimilarUrls = async (type,id)=> {
    return [
        `genre/${type}/list`,
        `${type}/${id}/similar`,
    ].map((url)=>{
        return fetch(`${base}/${url}?api_key=${apiKey}`)
    });
};

export const getPeopleUrl = async (id)=> {
    return fetch(`${base}/person/${id}?api_key=${apiKey}`);
};

export const getCreditsUrls = async (type,id)=> {
    return [
        `genre/${type}/list`,
        `person/${id}/${type}_credits`,
    ].map((url)=>{
        return fetch(`${base}/${url}?api_key=${apiKey}`)
    });
};