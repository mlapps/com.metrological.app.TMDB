import { Lightning, Router } from '@lightningjs/sdk';
import { ItemWrapper } from "../";

export default class FlipList extends Lightning.Component {

    static _template() {
        return {
            Items: {
                alpha: 0, x: 1320, y: 300,
                forceZIndexContext: true, boundsMargin: [500, 100, 500, 100],
                transitions: {
                    alpha: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    x: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                }
            },
            Pagination: {
                flex: {},
                mount: 1, x: 1830, y: 1005,
                Current: {
                    text: {fontSize: 28, fontFace: "SemiBold"}
                },
                Total: {
                    flexItem: {marginTop: 7},
                    text: {fontSize: 21, fontFace: "Regular", textColor: 0xff626262}
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

    get realWidth() {
        let construct = this._itemConstruct;
        return this._items.length * (construct.width + construct.offset)
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
        return items.map((item, idx) => {

            let configIndex = idx+1;
            if (idx > 3) {
                configIndex = 4;
            }

            return {
                type: ItemWrapper,
                construct,
                index: idx,
                configIndex,
                item: item,
                x: idx>=3?0:200/configIndex,
                transitions: {
                    x: {duration: configIndex*0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                },
                w: construct.width,
                h: construct.height
            }
        })
    }

    _animateToSelected(index = this._index) {
        this.tag("Items").children.forEach((child, idx) => {
            const realChild = child.child;

            if (realChild) {
                if (idx === index - 1) {
                    realChild.configIndex = 0;
                } else if (idx === index) {
                    realChild.configIndex = 1;
                } else if (idx === index + 1) {
                    realChild.configIndex = 2;
                } else if (idx === index + 2) {
                    realChild.configIndex = 3;
                } else if (idx > index + 2) {
                    realChild.configIndex = 4;
                }
                realChild.animatePosition();
            }
        });

        if (index === this.tag("Items").children.length - 1) {
            this.tag("Items").setSmooth("x", 1490)
        } else if (index === this.tag("Items").children.length - 2) {
            this.tag("Items").setSmooth("x", 1420)
        } else if (index === this.tag("Items").children.length - 3)  {
            this.tag("Items").setSmooth("x", 1320)
        }

        const item = this._items[this._index];
        this.application.emit("setItem", {item});
        this.tag("Current").text = `${index+1}`;
        this.tag("Total").text = ` / ${this.tag("Items").children.length}`;
    }

    _focus() {
        this.tag("Items").patch({
            smooth: {alpha: 1}
        });

        this.tag("Items").children.forEach((item, index) => {
            if (index < 3) {
                item.setSmooth("x", 0);
            }
        });

        this._animateToSelected();
    }

    _unfocus() {
        this.tag("Items").patch({
            smooth: {alpha: 0}
        });
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

    _handleEnter() {
        const item = this.activeItem.item;
        Router.navigate(`details/${item.type}/${item.id}`, true);
    }

    select({direction}) {
        this._direction = direction;
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
        return 560;
    }
}