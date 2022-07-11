import {Router} from "@lightningjs/sdk";
import Popular from "./index";

export default class Movie extends Popular {
    _active() {
        this.widgets.menu.select("movie", true);
    }

    _handleDown() {
        this.widgets.menu.select("tv");
        Router.navigate(`tv`);
    }
}