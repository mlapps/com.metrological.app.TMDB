import {Router} from "wpe-lightning-sdk";
import {getMovies, getTv, getDetails, getGenres, setGenres} from './Api';

/**
 *  bind a data request to a specific route, before a page load
 *  the router will test for any data-binding. If there is, it will
 *  wait for the promise to resolve and load the correct page.
 */
export default () => {

    Router.boot(async()=> {
        const genres = await getGenres();
        setGenres(genres);
    });

    Router.before("movies", async ({page})=>{
        const main = await getMovies();
        page.main = main;
    });

    Router.before("tv", async ({page})=>{
        const main = await getTv();
        page.main = main;
    });

    Router.before("details/:itemType/:itemId", async ({page, itemType, itemId})=>{
        const details = await getDetails(itemType, itemId);
        page.details = details;
    });

}