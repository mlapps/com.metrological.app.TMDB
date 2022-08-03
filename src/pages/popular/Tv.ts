import {Router} from "@lightningjs/sdk";
import Popular from "./index";

export default class Tv extends Popular {
    override _active() {
        this.widgets.menu.select("tv", true);
    }

    override _handleUp() {
        this.widgets.menu.select("movie");
        Router.navigate(`movie`);
    }

    override _handleDown() {
        this.widgets.menu.select("accessibility");
        Router.navigate(`accessibility`);
    }
}
