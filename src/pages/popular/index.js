import {Lightning, Router} from '@lightningjs/sdk';
import Content from "./Content";

export default class Popular extends Lightning.Component{

    static _template() {
        return {
            Content: {
                mountY: 0.5, y: 540, x: 90,
                type: Content
            },
            List: {}
        };
    }

    _init() {
        this._index = 0;
    }

    set content(v) {
        this.tag("List").childList.add(v);
    }

    $firstItemCreated() {
        this._refocus();
    }

    _getFocused() {
        this.widgets.menu.show(); // @todo: move
        return this.tag("List").children[this._index];
    }

    $navigateToDetails({item}) {
        this.tag("Content").hide();
        this.widgets.menu.hide();
        Router.navigate(`details/${item.type}/${item.id}`, true);
    }

}