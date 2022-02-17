import {Lightning, Router} from '@lightningjs/sdk';

export default class Movies extends Lightning.Component{

    static _template() {
        return {};
    }

    _init() {
        this._index = 0;
    }

    set content(v) {
        this.childList.add(v);
    }

    $firstItemCreated() {
        this._refocus();
    }

    _getFocused() {
        return this.children[this._index];
    }
}