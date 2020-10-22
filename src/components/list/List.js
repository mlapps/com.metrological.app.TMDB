import { Lightning, Router } from '@lightningjs/sdk';
import { ItemWrapper } from "../";

export default class List extends Lightning.Component {

    static _template() {
        return {
            Items: {
                y: 154, forceZIndexContext: true, boundsMargin: [500, 100, 500, 100],
                transitions: {
                    x: {duration: .3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                }
            },
            Focus: {
                x: -32, y: 102, colorLeft: 0xff8ecea2, colorRight: 0xff03b3e4,
                texture: Lightning.Tools.getRoundRect(236, 344, 16, 6, 0xffffffff, true, 0x00ffffff)
            },
            About: {
                x: -32, y: 60, mountY: 1,
                flex: {direction: "column"},
                Title: {
                    text: {fontSize: 64, fontFace: "SourceSansPro-Bold", wordWrapWidth: 960, maxLines: 1}
                },
                Genres: {
                    flexItem: {marginTop: -24},
                    colorLeft: 0xff8ecea2, colorRight: 0xff03b3e4,
                    text: {fontSize: 32, fontFace: "SourceSansPro-Regular", wordWrapWidth: 960, maxLines: 1}
                }
            }
        };
    }

    _construct() {
        this._index = 0;
    }

    _init() {
        this.tag("Title").on("txLoaded", ()=> {
            this.tag("About").setSmooth("y", 90, {duration: 1, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'});
        });

        this.application.on("setItem", (item)=> {
            if (item === this._item) {
                return;
            }

            this._item = item;

            const genres = item.genres.map((genre,index) => {
                if (index < 2) {return genre.name}
            }).filter(item => item).join(" | ");

            this.tag("About").setSmooth("y", 60, {duration: 0});

            this.patch({
                About: {
                    Title: {
                        text: {text: item.title}
                    },
                    Genres: {
                        text: {text: genres}
                    }
                }
            });
        });
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
        this.tag("Items").children.forEach((item, idx) => {
            const child = item.child;

            if (child) {
                if (idx > index - 1 && idx < index + 8) {
                    child.tag("Image").setSmooth("color", 0xffffffff);
                } else if (idx === index - 1 || idx === index + 8) {
                    child.tag("Image").setSmooth("color", 0xff2f2f2f);
                }
            }
        });

        this.tag("Items").setSmooth("x", -this.activeItem.finalX);
    }

    _focus() {
        this.patch({
            smooth: {x: [0, {duration: .2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}]},
            Focus: {
                smooth: {alpha: [1, {duration: .4, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}]}
            },
            About: {
                smooth: {
                    x: [-32, {duration: .2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}],
                    y: [90, {duration: .2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}]
                }
            }
        });

        this._animateToSelected();
    }

    _unfocus() {
        this.patch({
            smooth: {x: [-32, {duration: .4, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}]},
            Focus: {
                smooth: {alpha: [0, {duration: .2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}]}
            },
            About: {
                smooth: {
                    y: [130, {duration: .4, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}],
                    x: [0, {duration: .4, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}]
                }
            }
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
        return 560;
    }
}