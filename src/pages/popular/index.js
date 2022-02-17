import {Lightning} from '@lightningjs/sdk';
import Background from "./Background";
import Content from "./Content";

export default class Popular extends Lightning.Component{

    static _template() {
        return {
            Background: {
                type: Background
            },
            Content: {
                mountY: 0.5, y: 540, x: 90,
                type: Content
            },
            Carousel: {}
        };
    }

    _init() {
        this._index = 0;
    }

    set content(v) {
        this.tag("Carousel").childList.add(v);
    }

    $firstItemCreated() {
        this._refocus();
    }

    _getFocused() {
        return this.tag("Carousel").children[this._index];
    }
}