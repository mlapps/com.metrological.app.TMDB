import Popular from "./popular";
import {Router} from "@lightningjs/sdk";
import { FlipList } from "../components";

export default class TvCredits extends Popular {
    private _peopleId = '';

    override _active() {
        this.widgets.peoplemenu.select("tvcredits", true);
    }

    set peopleId(v: string) {
        this._peopleId = v;
    }

    override _handleUp() {
        this.widgets.peoplemenu.select("moviecredits");
        Router.navigate(`movie_credits/${this._peopleId}`, true);
    }

    override _getFocused() {
        return this.List.children[this._index] as FlipList;
    }
}