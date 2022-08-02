import {getCreditsUrl, getCreditsUrls, getDetailUrl, getPeopleUrl, getPopularUrls, getSimilarUrls} from "./endpoints";

import {
    NotFound, Splash, Movie, Tv, Details, Cast, Similar, People, MovieCredits
} from '../pages';
import {details, list, people} from "./factory";
import TvCredits from "../pages/TvCredits";
import Accessibility from "../pages/Accessibility";
import { ContainerData } from "./models/ContainerModel";
import { Router } from "@lightningjs/sdk";

const getPopularContent = async (type: 'movie' | 'tv')=>{
    try {
        const [genresRes, discoverRes] = await getPopularUrls(type);
        return list(type, discoverRes, genresRes.genres);
    } catch (e){
        console.log(e)
    }
}

export const routes: Router.Config = {
    root: "splash",
    routes: [
        {
            path: 'splash',
            component: Splash
        },
        {
            path: 'movie',
            component: Movie,
            before: async(page: Movie)=> {
                page.content = (await getPopularContent("movie"))!;
            },
            widgets: ["menu"]
        },
        {
            path: 'tv',
            component: Tv,
            before: async(page: Tv)=> {
                page.content = (await getPopularContent("tv"))!;
            },
            widgets: ["menu"]
        },
        {
            path: 'accessibility',
            component: Accessibility,
            widgets: ["menu"]
        },
        {
            path: 'details/:type/:id',
            component: Details,
            before: async (page: Details, {type, id}: Record<'type' | 'id', string>) =>{
                return getDetailUrl(type, id).then(function (data) {
                    page.detailsType = type;
                    page.content = details(data);
                }).catch(function (error) {
                    console.log(error);
                });
            },
            widgets: ["detailsmenu"]
        },
        {
            path: 'cast/:type/:id',
            component: Cast,
            before: async (page: Cast, {type, id}: Record<'type' | 'id', string>) =>{
                if (type !== 'movie' && type !== 'tv') {
                    throw new Error('Invalid type');
                }
                return getCreditsUrl(type, id).then(function (data) {
                    page.detailsType = type;
                    page.detailsId = id;
                    const content = list("cast", data);
                    if (!content) {
                        throw new Error('Invalid Content');
                    }
                    page.content = content;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            widgets: ["detailsmenu"]
        },
        {
            path: 'similar/:type/:id',
            component: Similar,
            before: async (page: Similar, {type, id}: Record<'type' | 'id', string>) => {
                if (type !== 'movie' && type !== 'tv') {
                    throw new Error('Invalid type');
                }
                return getSimilarUrls(type, id).then(function ([genresRes, similarRes]) {
                        const genres = genresRes.genres;
                        page.detailsType = type;
                        page.detailsId = id;
                        const content = list(type, similarRes, genres);
                        if (!content) {
                            throw new Error('Invalid Content');
                        }
                        page.content = content;
                    }).catch(function (error) {
                        console.log("error", error);
                    });
            },
            widgets: ["detailsmenu"]
        },
        {
            path: 'people/:id',
            component: People,
            before: async (page: People, {id}: Record<'id', string>) =>{
                return getPeopleUrl(id).then(function (data) {
                    page.content = people(data);
                }).catch(function (error) {
                    console.log(error);
                });
            },
            widgets: ["peoplemenu"]
        },
        {
            path: 'movie_credits/:peopleId',
            component: MovieCredits,
            before: async (page: MovieCredits, {peopleId}: Record<'peopleId', string>) =>{
                return getCreditsUrls('movie', peopleId).then(function ([genresRes, creditsRes]) {
                        const genres = genresRes.genres;
                        const data = {results: creditsRes.cast} as ContainerData;
                        page.peopleId = peopleId;
                        const content = list('movie', data, genres);
                        if (!content) {
                            throw new Error('Invalid Content');
                        }
                        page.content = content;
                    }).catch(function (error) {
                        console.log("error", error);
                    });
            },
            widgets: ["peoplemenu"]
        },
        {
            path: 'tv_credits/:peopleId',
            component: TvCredits,
            before: async (page: TvCredits, {peopleId}: Record<'peopleId', string>) =>{
                return getCreditsUrls('tv', peopleId).then((response)=>{
                    return Promise.all(response).then(function ([genresRes, creditsRes]) {
                        const genres = genresRes.genres;
                        const data = {results: creditsRes.cast} as ContainerData;
                        page.peopleId = peopleId;
                        const content = list('tv', data, genres);
                        if (!content) {
                            throw new Error('Invalid Content');
                        }
                        page.content = content;
                    }).catch(function (error) {
                        console.log("error", error);
                    });
                })
            },
            widgets: ["peoplemenu"]
        },
        {
            path: '*',
            component: NotFound,
        }
    ],
}
