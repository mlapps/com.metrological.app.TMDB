import Popular from "./popular";
import {Router} from "@lightningjs/sdk";

export default class MovieCredits extends Popular {
    _active() {
        this.widgets.peoplemenu.select("moviecredits", true);
    }

    $navigateToDetails({item}) {
        this.tag("Content").hide();
        Router.navigate(`details/${item.type}/${item.id}`, true);
    }

    set peopleId(v) {
        this._peopleId = v;
    }

    _handleUp() {
        this.widgets.peoplemenu.select("details");
        Router.navigate(`people/${this._peopleId}`, true);
    }

    _handleDown() {
        this.widgets.peoplemenu.select("tvcredits");
        Router.navigate(`tv_credits/tv/${this._peopleId}`, true);
    }

    _getFocused() {
        return this.tag("List").children[this._index];
    }
}