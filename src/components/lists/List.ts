import { Lightning } from '@lightningjs/sdk';
import {ItemWrapper} from "../index";
import { ListItemConstructorBase, ItemType } from '../item/ItemTypes';

interface ListTemplateSpec<
    ItemConstructor extends ListItemConstructorBase = ListItemConstructorBase
> extends Lightning.Component.TemplateSpecStrong {
    items: ItemType<ItemConstructor>[],
    itemConstruct: ItemConstructor,
    container: any,
    Items: {}
}

export default class List<ItemConstructor extends ListItemConstructorBase = ListItemConstructorBase>
    extends Lightning.Component<ListTemplateSpec<ItemConstructor>>
    implements Lightning.Component.ImplementTemplateSpec<ListTemplateSpec<ItemConstructor>> {

    Items = this.getByRef('Items')!;
    _index = 0;
    _container: any
    _itemConstruct!: ItemConstructor;
    _items: ItemType<ItemConstructor>[] = [];

    static override _template(): Lightning.Component.Template<ListTemplateSpec> {
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


    get activeItem(): ItemWrapper<ItemConstructor> {
        return this.Items.children[this._index] as ItemWrapper<ItemConstructor>;
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

    _createItems({items, construct}: {items: ItemType<ItemConstructor>[], construct: ItemConstructor}) {
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
            this.Items.setSmooth("x", -this.activeItem.finalX + (this.activeItem.w * 4));
        } else {
            this.Items.setSmooth("x", 0);
        }
    }

    override _focus() {
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

    get index() {
        return this._index;
    }

    set index(index: number) {
        this.setIndex(index);
    }

    setIndex(index: number){
        this._index = index;
        this._animateToSelected();
        this._refocus();
    }

    select({direction}: {direction: -1 | 1}) {
        this._index += direction;
        this._animateToSelected();
    }

    $itemCreatedForFocus(){
        this.application.updateFocusPath();
    }

    override _getFocused(){
        return this.activeItem;
    }

    resetConfigIndex() {
        // Do Nothing, implements ListBaseConstructor
    }

    static get height() {
        return 451;
    }
}