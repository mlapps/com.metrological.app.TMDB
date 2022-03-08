import Popular from "./popular";
import {Router} from "@lightningjs/sdk";

export default class TvCredits extends Popular {
    _active() {
        this.widgets.peoplemenu.select("tvcredits", true);
    }

    set peopleId(v) {
        this._peopleId = v;
    }

    _handleUp() {
        this.widgets.peoplemenu.select("moviecredits");
        Router.navigate(`movie_credits/movie/${this._peopleId}`, true);
    }

    _getFocused() {
        return this.tag("List").children[this._index];
    }
}