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

        this.listeners = {
            contentHidden: ()=> {
                this.widgets.menu.hide();
                Router.navigate(`details/${this._item.type}/${this._item.id}`, true);
            }
        }
    }

    _attach() {
        ["contentHidden", "readyForNavigate"].forEach((event)=>{
            this.application.on(event, this.listeners[event])
        });
    }

    _detach() {
        ["contentHidden", "readyForNavigate"].forEach((event)=>{
            this.application.off(event, this.listeners[event])
        });
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

    $selectItem({item}) {
        this._item = item;
        Router.navigate(`details/${this._item.type}/${this._item.id}`, true);
    }

    historyState(params) {
        if (params) {
            this.selectedList.index = params.listIndex;
            this.selectedList.resetConfigIndex();
        } else {
            return {
                listIndex: this.tag("List").children[this._index].index
            }
        }
    }

}