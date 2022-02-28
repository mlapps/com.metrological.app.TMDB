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

    _active() {
        this.widgets.menu.show();
    }

    set content(v) {
        this.tag("List").childList.add(v);
    }

    $firstItemCreated() {
        this._refocus();
    }

    _getFocused() {
        return this.selectedList;
    }

    get selectedList() {
        return this.tag("List").children[this._index];
    }

    $navigateToDetails({item}) {
        this.tag("Content").hide();
        this.widgets.menu.hide();
        Router.navigate(`details/${item.type}/${item.id}`, true);
    }

    historyState(params) {
        if (params) {
            this.selectedList.index = params.listIndex;
            // this.selectedList._animateToSelected();
            this.selectedList.resetConfigIndex();
        } else {
            return {
                listIndex: this.tag("List").children[this._index].index
            }
        }
    }

}