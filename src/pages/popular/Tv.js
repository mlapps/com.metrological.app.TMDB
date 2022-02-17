import {Popular} from "../index";
import {Router} from "@lightningjs/sdk";

export default class Tv extends Popular {
    _active() {
        this.widgets.menu.select("tv", true);
    }

    _handleUp() {
        this.widgets.menu.select("movie");
        Router.navigate(`movie`);
    }
}