import Popular from "./popular";
import {Router} from "@lightningjs/sdk";

export default class MovieCredits extends Popular {

    _active() {
        this.widgets.peoplemenu.select("moviecredits", true);
    }

    set peopleId(v) {
        this._peopleId = v;
    }

    _handleUp() {
        Router.navigate(`people/${this._peopleId}`, true);
        this.widgets.peoplemenu.select("details");
    }

    _handleDown() {
        Router.navigate(`tv_credits/tv/${this._peopleId}`, true);
        this.widgets.peoplemenu.select("tvcredits");
    }
    _getFocused() {
        return this.tag("List").children[this._index];
    }
}