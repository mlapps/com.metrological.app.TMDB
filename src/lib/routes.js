import {Router} from "wpe-lightning-sdk";

import {
    NotFound, Main, Details, Splash
} from '../pages';

export default () =>{
    Router.root('splash', Splash);

    Router.route('movies', Main);
    Router.route('tv', Main);
    Router.route('details/:itemType/:itemId', Details);

    Router.start();
}