import {Router} from "@lightningjs/sdk";

import {
    NotFound,Error, Main, Details, Splash
} from '../pages';
import {getDetails, getMovies, getTv} from "./api";



// export default () =>{
//     Router.root('splash', Splash);
//
//     Router.route('movies', Main);
//     Router.route('tv', Main);
//     Router.route('details/:itemType/:itemId', Details);
//
//     Router.start();
// }

export default {
    root: "splash",
    routes: [
        {
            path: 'splash',
            component: Splash
        },
        {
            path: 'movies',
            component: Main,
            before: async(page)=>{
                const main = await getMovies();
                page.main = main;
            },
            widgets:["Menu"],
        },
        {
            path: 'tv',
            component: Main,
            before: async (page) =>{
                const main = await getTv();
                page.main = main;
            },
            widgets:["Menu"],
        },
        {
            path: 'details/:itemType/:itemId',
            component: Details,
            before: async (page, {itemType, itemId}) =>{
                const details = await getDetails(itemType, itemId);
                page.details = details;
            },
            widgets:["Menu"],
        },
        {
            path: '*',
            component: NotFound,
        },
        {
            path: '!',
            component: Error
        }
    ],
}