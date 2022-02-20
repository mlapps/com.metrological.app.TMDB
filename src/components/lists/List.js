import { Lightning, Router } from '@lightningjs/sdk';
import {ItemWrapper} from "../index";

export default class List extends Lightning.Component {

    static _template() {
        return {
            h: List.height,
            Items: {
                forceZIndexContext: true, boundsMargin: [500, 100, 500, 100],
                transitions: {
                    x: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                }
            }
        };
    }

    _construct() {
        this._index = 0;
    }

    get activeItem() {
        return this.tag("Items").children[this._index];
    }

    set container(v){
        this._container = v;
    }

    get container(){
        return this._container;
    }

    set itemConstruct(v) {
        this._itemConstruct = v;
    }

    get itemConstruct(){
        return this._itemConstruct;
    }

    get getRealComponent() {
        return this.activeItem.child;
    }

    set items(v) {
        let construct = this._itemConstruct;
        this._items = v;

        //@warn: since we lazy create all the items
        // we need to set the itemWrapper flag to false
        // so it can notify that the first item is created
        ItemWrapper.FIRST_CREATED = false;

        this.tag("Items").patch({
            children: this._createItems({items: this._items, construct})
        });
    }

    get items() {
        return this._items;
    }

    _createItems({items, construct}) {
        return items.map((item, index) => {
            return {
                type: ItemWrapper,
                construct,
                index: index,
                item: item,
                x: index * (construct.width + construct.offset),
                w: construct.width,
                h: construct.height
            };
        })
    }

    _animateToSelected(index = this._index) {
        if (index > 4) {
            this.tag("Items").setSmooth("x", -this.activeItem.finalX + (this.activeItem.w * 4));
        } else {
            this.tag("Items").setSmooth("x", 0);
        }
    }

    _focus() {
        this._animateToSelected();
    }

    _unfocus() {
        this.stage.gc();
    }

    _handleLeft() {
        if (this._index > 0) {
            this.select({direction:-1});
        } else {
            return false;
        }
    }

    _handleRight() {
        if (this._index < this.tag("Items").children.length - 1) {
            this.select({direction:1});
        } else {
            return false;
        }
    }

    setIndex(index){
        this._index = index;
        this._animateToSelected();
        this._refocus();
    }

    select({direction}) {
        this._index += direction;
        this._animateToSelected();
    }

    $itemCreatedForFocus(){
        this.application.updateFocusPath();
    }

    _getFocused(){
        return this.activeItem;
    }

    static get height() {
        return 451;
    }
}