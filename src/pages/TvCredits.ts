import Popular from "./popular";
import {Router} from "@lightningjs/sdk";
import { FlipList } from "../components";

export default class TvCredits extends Popular {
    private _peopleId = '';

    _active() {
        this.widgets.peoplemenu.select("tvcredits", true);
    }

    set peopleId(v: string) {
        this._peopleId = v;
    }

    _handleUp() {
        this.widgets.peoplemenu.select("moviecredits");
        Router.navigate(`movie_credits/movie/${this._peopleId}`, true);
    }

    _getFocused() {
        return this.List.children[this._index] as FlipList;
    }
}