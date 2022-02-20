import Popular from "./popular";
import {Router} from "@lightningjs/sdk";

export default class Similar extends Popular {
    _active() {
        this.widgets.detailsmenu.select("similar", true);
    }

    $navigateToDetails({item}) {
        this.tag("Content").hide();
        Router.navigate(`details/${item.type}/${item.id}`, true);
    }

    set detailsType(v) {
        this._detailsType = v;
    }

    set detailsId(v) {
        this._detailsId = v;
    }

    _handleUp() {
        this.widgets.detailsmenu.select("cast");
        Router.navigate(`cast/${this._detailsType}/${this._detailsId}`, true);
    }

    _getFocused() {
        return this.tag("List").children[this._index];
    }
}