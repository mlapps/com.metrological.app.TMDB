import Popular from "./popular";
import {Router} from "@lightningjs/sdk";
import { FlipList } from "../components";

export default class Similar extends Popular {
    private _detailsType = '';
    private _detailsId = 0;
    _active() {
        this.widgets.detailsmenu.select("similar", true);
    }

    set detailsType(v: string) {
        this._detailsType = v;
    }

    set detailsId(v: number) {
        this._detailsId = v;
    }

    _handleUp() {
        this.widgets.detailsmenu.select("cast");
        Router.navigate(`cast/${this._detailsType}/${this._detailsId}`, true);
    }

    _getFocused() {
        return this.List.children[this._index] as FlipList;
    }
}