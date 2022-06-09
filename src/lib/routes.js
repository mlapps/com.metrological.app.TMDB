import {getCreditsUrl, getCreditsUrls, getDetailUrl, getPeopleUrl, getPopularUrls, getSimilarUrls} from "./endpoints";

import {
    NotFound, Error, Splash, Movie, Tv, Details, Cast, Similar, People, MovieCredits
} from '../pages';
import {details, list, people} from "./factory";
import TvCredits from "../pages/TvCredits";
import Accessibility from "../pages/Accessibility";

const getPopularContent = async (type)=>{
    try {
        const urls = await getPopularUrls(type);
        const response = await Promise.all(urls);
        const [g, data] = await Promise.all(
            response.map((d)=>d.json())
        );
        return list(type, data, g.genres);
    } catch (e){
        console.log(e)
    }
}

export default {
    root: "splash",
    routes: [
        {
            path: 'splash',
            component: Splash
        },
        {
            path: 'movie',
            component: Movie,
            before: async(page)=> {
                page.content = await getPopularContent("movie");
            },
            widgets: ["menu"]
        },
        {
            path: 'tv',
            component: Tv,
            before: async(page)=> {
                page.content = await getPopularContent("tv");
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
            before: async (page, {type, id}) =>{
                return getDetailUrl(type, id).then(response => {
                    return response.json();
                }).then(function (data) {
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
            before: async (page, {type, id}) =>{
                return getCreditsUrl(type, id).then(response => {
                    return response.json();
                }).then(function (data) {
                    page.detailsType = type;
                    page.detailsId = id;
                    page.content = list("cast", data);
                }).catch(function (error) {
                    console.log(error);
                });
            },
            widgets: ["detailsmenu"]
        },
        {
            path: 'similar/:type/:id',
            component: Similar,
            before: async (page, {type, id}) =>{
                return getSimilarUrls(type, id).then((response)=>{
                    return Promise.all(response).then(function (responses) {
                        return Promise.all(responses.map(function (response) {
                            return response.json();
                        }));
                    }).then(function (response) {
                        const genres = response[0].genres;
                        const data = response[1];
                        page.detailsType = type;
                        page.detailsId = id;
                        page.content = list(type, data, genres);
                    }).catch(function (error) {
                        console.log("error", error);
                    });
                })
            },
            widgets: ["detailsmenu"]
        },
        {
            path: 'people/:id',
            component: People,
            before: async (page, {id}) =>{
                return getPeopleUrl(id).then(response => {
                    return response.json();
                }).then(function (data) {
                    page.content = people(data);
                }).catch(function (error) {
                    console.log(error);
                });
            },
            widgets: ["peoplemenu"]
        },
        {
            path: 'movie_credits/:type/:id',
            component: MovieCredits,
            before: async (page, {type, id}) =>{
                return getCreditsUrls(type, id).then((response)=>{
                    return Promise.all(response).then(function (responses) {
                        return Promise.all(responses.map(function (response) {
                            return response.json();
                        }));
                    }).then(function (response) {
                        const genres = response[0].genres;
                        const data = {results: response[1].cast};
                        page.peopleId = id;
                        page.content = list(type, data, genres);
                    }).catch(function (error) {
                        console.log("error", error);
                    });
                })
            },
            widgets: ["peoplemenu"]
        },
        {
            path: 'tv_credits/:type/:id',
            component: TvCredits,
            before: async (page, {type, id}) =>{
                return getCreditsUrls(type, id).then((response)=>{
                    return Promise.all(response).then(function (responses) {
                        return Promise.all(responses.map(function (response) {
                            return response.json();
                        }));
                    }).then(function (response) {
                        const genres = response[0].genres;
                        const data = {results: response[1].cast};
                        page.peopleId = id;
                        page.content = list(type, data, genres);
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
