import {Router} from "@lightningjs/sdk";
import Popular from "./index";

export default class Movie extends Popular {
    override _active() {
        this.widgets.menu.select("movie", true);
    }

    override _handleDown() {
        this.widgets.menu.select("tv");
        Router.navigate(`tv`);
    }
}