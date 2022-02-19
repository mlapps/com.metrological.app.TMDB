import {Lightning, Router} from '@lightningjs/sdk';
import Content from "./Content";

export default class Popular extends Lightning.Component{

    static _template() {
        return {
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
        this.widgets.menu.show(); // @todo: move
        return this.tag("Carousel").children[this._index];
    }

    $navigateToDetails({item}) {
        this.tag("Content").hide();
        this.widgets.menu.hide();

        setTimeout(()=> {
            Router.navigate(`details/${item.type}/${item.id}`, true);
        }, 200);
    }

}