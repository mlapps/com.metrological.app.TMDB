import {getDetailUrl, getPopularUrls} from "./endpoints";

import {
    NotFound, Error, Splash, Movie, Tv, Details
} from '../pages';
import {details, list} from "./factory";

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
                const type = "movie";

                return getPopularUrls(type).then((response)=>{
                    return Promise.all(response).then(function (responses) {
                        return Promise.all(responses.map(function (response) {
                            return response.json();
                        }));
                    }).then(function (response) {
                        const genres = response[0].genres;
                        const data = response[1];
                        page.content = list(type, data, genres);
                    }).catch(function (error) {
                        console.log("error", error);
                    });
                })
            },
            widgets: ["menu"]
        },
        {
            path: 'tv',
            component: Tv,
            before: async(page)=> {
                const type = "tv";

                return getPopularUrls(type).then((response)=>{
                    return Promise.all(response).then(function (responses) {
                        return Promise.all(responses.map(function (response) {
                            return response.json();
                        }));
                    }).then(function (response) {
                        const genres = response[0].genres;
                        const data = response[1];
                        page.content = list(type, data, genres);
                    }).catch(function (error) {
                        console.log("error", error);
                    });
                })
            },
            widgets: ["menu"]
        },
        {
            path: 'details/:type/:id',
            component: Details,
            before: async (page, {type, id}) =>{
                return getDetailUrl(type, id).then(response => {
                    return response.json();
                }).then(function (data) {
                    page.content = details(data);
                }).catch(function (error) {
                    console.log(error);
                });
            },
            widgets: ["detailsmenu"]
        },
        {
            path: '*',
            component: NotFound,
        }
    ],
}