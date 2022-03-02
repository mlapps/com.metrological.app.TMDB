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
        this._hide(-1);
        this.widgets.peoplemenu.select("details");
    }

    _handleDown() {
        this._hide(1);
        this.widgets.peoplemenu.select("tvcredits");
    }

    _hide(direction) {
        this._direction = direction;

        this.patch({
            smooth: {alpha: 0}
        });
    }

    _readyToNavigate() {
        if (this._direction === 1) {
            Router.navigate(`tv_credits/tv/${this._peopleId}`, true);
        } else {
            Router.navigate(`people/${this._peopleId}`, true);
        }
    }

    _getFocused() {
        return this.tag("List").children[this._index];
    }
}