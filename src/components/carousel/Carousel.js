import { Lightning, Router } from '@lightningjs/sdk';
import { ItemWrapper } from "../";

export default class Carousel extends Lightning.Component {

    static _template() {
        return {
            Content: {
                w: 1920, h: 1080, rtt: true,
                Items: {
                    forceZIndexContext: true, boundsMargin: [500, 100, 500, 100]
                }
            }
        };
    }

    _construct() {
        this._index = 0;
    }

    get activeItem() {
        return this._items[this._index].itemCtr;
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

    set index(v) {
        this._index = v;
    }

    get realWidth() {
        let construct = this._itemConstruct;
        return this._items.length * (construct.width + construct.offset)
    }

    set items(v) {
        let construct = this._itemConstruct;
        this._items = v;
        this.tag("Items").x = 960 - (construct.width/2);
        this.tag("Items").y = 500 - (construct.height/2);

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
            let itemCtr =  this.stage.c({
                type: ItemWrapper,
                construct,
                index: index,
                item: item,
                x: index * (construct.width + construct.offset)
            });
            item.itemCtr = itemCtr;

            return itemCtr;
        })
    }

    _animateToSelected(index = this._index, direction, skip) {
        const children = this._items;

        for (let i = 0, j = children.length; i < j; i++) {
            const child = children[i];
            const offset = i - index;
            const position = offset * (child.itemCtr.construct.width + child.itemCtr.construct.offset);
            if (child.__shifted) {
                child.itemCtr.setSmooth("x", position, {duration: 0});
                child.__shifted = false;
            } else {
                child.itemCtr.setSmooth("x", position, {duration: skip?0:.3});
            }
        }

        const item = this._items[this._index];
        this.application.emit("setItem", {item, direction});
    }

    _focus() {
        this._animateToSelected(this._index, 0, true);
    }

    _unfocus() {
        this.stage.gc();
    }

    _handleLeft() {
        const item = this._items.pop();
        item.__shifted = true;
        this._items.unshift(item);
        this._animateToSelected(this._index, 1);
    }

    _handleRight() {
        const item = this._items.shift();
        item.__shifted = true;
        this._items.push(item);
        this._animateToSelected(this._index, -1);
    }

    _handleEnter() {
        const item = this.activeItem.item;
        Router.navigate(`details/${item.type}/${item.id}`, true);
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
}