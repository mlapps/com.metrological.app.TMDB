import {Router} from "wpe-lightning-sdk";

import {
    NotFound, Main, Details
} from '../pages';

export default () =>{
    Router.root('movies', Main);

    Router.route('movies', Main);
    Router.route('tv', Main);
    Router.route('details/:itemType/:itemId', Details);

    Router.start();
}