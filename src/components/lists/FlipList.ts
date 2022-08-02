import { Lightning } from '@lightningjs/sdk';
import { ItemWrapper } from "..";
import type { FlipListItemConstructorBase, ItemType } from '../item/ItemTypes';

interface FlipListTemplateSpec<ItemConstructor extends FlipListItemConstructorBase = FlipListItemConstructorBase> extends Lightning.Component.TemplateSpecStrong {
    items: Array<ItemType<ItemConstructor>>, // Items are just passed through
    itemConstruct: ItemConstructor,
    Items: {},
    Pagination: {
        Current: {},
        Total: {}
    }
}

export default class FlipList<ItemConstructor extends FlipListItemConstructorBase = FlipListItemConstructorBase>
    extends Lightning.Component<FlipListTemplateSpec<ItemConstructor>>
    implements Lightning.Component.ImplementTemplateSpec<FlipListTemplateSpec<ItemConstructor>>
 {
    Items = this.getByRef('Items')!;
    Pagination = this.getByRef('Pagination')!;
    Current = this.Pagination.getByRef('Current')!;
    Total = this.Pagination.getByRef('Total')!;

    private _index = 0;
    private _container: any;
    private _itemConstruct!: ItemConstructor;
    private _items: Array<ItemType<ItemConstructor>> = [];
    private _direction: -1 | 1 = 1;

    static override _template(): Lightning.Component.Template<FlipListTemplateSpec> {
        return {
            Items: {
                alpha: 0, x: 1320, y: 300,
                forceZIndexContext: true, boundsMargin: [0, 0, 200, 0],
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

    override _construct() {
        this._index = 0;
    }

    get activeItem(): ItemWrapper<ItemConstructor> {
        return this.Items.children[this._index] as ItemWrapper<ItemConstructor>;
    }

    get index() {
        return this._index;
    }

    set index(v) {
        this._index = v;
    }

    set container(v){
        this._container = v;
    }

    get container(){
        return this._container;
    }

    set itemConstruct(v: ItemConstructor) {
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

        this.Items.patch({
            children: this._createItems({items: this._items, construct})
        });
    }

    get items() {
        return this._items;
    }

    _createItems({items, construct}: {items: Array<InstanceType<ItemConstructor>['item']>, construct: ItemConstructor}): Lightning.Component.NewPatchTemplate<typeof ItemWrapper>[] {
        return items.map((item, idx) => {
            const configIndex = idx > 3 ? 4 : idx+1;

            return {
                type: ItemWrapper,
                construct,
                index: idx,
                item: item,
                configIndex,
                w: construct.width,
                h: construct.height,
                visible: idx <= 3
            }
        });
    }

    resetConfigIndex() {
        const children = this.Items.children as ItemWrapper<ItemConstructor>[];
        children.forEach((child, idx)=> {
            child.visible = false;
            if (idx === this._index-1) {
                child.visible = true;
                child.configIndex = 0;
                if (child.child?.animatePosition) {
                    child.child.focusedItem = false;
                    child.child.animatePosition();
                }
            } else if (idx === this._index) {
                child.visible = true;
                child.configIndex = 1;
                if (child.child?.animatePosition) {
                    child.child.focusedItem = true;
                    child.child.animatePosition();
                }
            } else if (idx === this._index+1) {
                child.visible = true;
                child.configIndex = 2;
                if (child.child?.animatePosition) {
                    child.child.focusedItem = false;
                    child.child.animatePosition();
                }
            } else if (idx === this._index+2) {
                child.visible = true;
                child.configIndex = 3;
                if (child.child?.animatePosition) {
                    child.child.animatePosition();
                }
            } else if (idx === this._index+3) {
                child.visible = true;
                child.configIndex = 4;
                if (child.child?.animatePosition) {
                    child.child.animatePosition();
                }
            }
        });
    }

    _animateToSelected() {
        const index = this._index;
        const children = this.Items.children  as ItemWrapper<ItemConstructor>[];
        const lastItem = children[index-1];
        if (lastItem) {
            lastItem.configIndex = 0;
            if (lastItem.child?.animatePosition) {
                lastItem.child.focusedItem = false;
                lastItem.child.animatePosition();
            }
        }
        const curItem = children[index];
        if (curItem) {
            curItem.visible = true;
            curItem.configIndex = 1;
            if (curItem.child?.animatePosition) {
                curItem.child.focusedItem = true;
                curItem.child.animatePosition();
            }
        }

        const itemPlus1 = children[index+1];
        if (itemPlus1) {
            itemPlus1.visible = true;
            itemPlus1.configIndex = 2;
            if (itemPlus1.child?.animatePosition) {
                itemPlus1.child.focusedItem = false;
                itemPlus1.child.animatePosition();
            }
        }

        const itemPlus2 = children[index+2];
        if (itemPlus2) {
            itemPlus2.visible = true;
            itemPlus2.configIndex = 3;
            if (itemPlus2.child?.animatePosition) {
                itemPlus2.child.animatePosition();
            }
        }

        const itemPlus3 = children[index+3];
        if (itemPlus3) {
            itemPlus3.configIndex = 4;
            if (itemPlus3.child?.animatePosition) {
                itemPlus3.child.animatePosition();
            }
        }

        if (index === this.Items.children.length - 1) {
            this.Items.setSmooth("x", 1490)
        } else if (index === this.Items.children.length - 2) {
            this.Items.setSmooth("x", 1420)
        } else if (index === this.Items.children.length - 3)  {
            this.Items.setSmooth("x", 1320)
        }

        const item = this._items[this._index]!;
        this.application.emit("setItem", {item});
        this.Current.text = `${index+1}`;
        this.Total.text = ` / ${this.Items.children.length}`;
    }

    override _focus() {
        this.Items.patch({
            smooth: {alpha: 1}
        });

        this.Items.children.forEach((item, index) => {
            if (index < 3) {
                item.setSmooth("x", 0);
            }
        });

        this._animateToSelected();
    }

    override _unfocus() {
        this.stage.gc();
    }

    override _handleLeft() {
        if (this._index > 0) {
            this.select({direction:-1});
        } else {
            return false;
        }
    }

    override _handleRight() {
        if (this._index < this.Items.children.length - 1) {
            this.select({direction:1});
        } else {
            return false;
        }
    }

    select({direction}: {direction: -1 | 1}) {
        this._direction = direction;
        this._index += direction;
        this._animateToSelected();
    }

    override _getFocused() {
        return this.activeItem;
    }

    static get height() {
        return 560;
    }
}