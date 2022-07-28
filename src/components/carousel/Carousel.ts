import { Lightning, Router } from '@lightningjs/sdk';
import { ItemWrapper } from "..";

interface ItemConstructorBase {
    new (...args: any[]): Lightning.Component & {
        animatePosition(): void;
        focusedItem: boolean;
    };
    get width(): number;
    get height(): number;
    get offset(): number;
}

interface CarouselTemplateSpec<
    ItemConstructor extends ItemConstructorBase = ItemConstructorBase
> extends Lightning.Component.TemplateSpecStrong {
    container: any;
    itemConstruct: ItemConstructor;
    index: number;
    Content: {
        Items: {}
    }
}

export default class Carousel<
    ItemConstructor extends ItemConstructorBase
>
    extends Lightning.Component<CarouselTemplateSpec<ItemConstructor>>
    implements Lightning.Component.ImplementTemplateSpec<CarouselTemplateSpec<ItemConstructor>>
    {

    Content = this.getByRef('Content')!;
    Items = this.Content?.getByRef('Items')!;

    private _index = 0;
    private _items: any[] = [];
    private _container: any;
    private _itemConstruct!: ItemConstructor;

    static override _template(): Lightning.Component.Template<CarouselTemplateSpec> {
        return {
            Content: {
                w: 1920, h: 1080, rtt: true,
                Items: {
                    forceZIndexContext: true, boundsMargin: [500, 100, 500, 100]
                }
            }
        };
    }

    get activeItem(): any {
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

    set index(v: number) {
        this._index = v;
    }

    get realWidth() {
        let construct = this._itemConstruct;
        return this._items.length * (construct.width + construct.offset)
    }

    set items(v) {
        let construct = this._itemConstruct;
        this._items = v;
        this.Items.x = 960 - (construct.width/2);
        this.Items.y = 500 - (construct.height/2);

        ItemWrapper.FIRST_CREATED = false;

        this.Items.patch({
            children: this._createItems({items: this._items, construct})
        });
    }

    get items() {
        return this._items;
    }

    _createItems({items, construct}: {items: any[], construct: ItemConstructor}) {
        return items.map((item, index) => {
            let itemCtr =  this.stage.c<typeof ItemWrapper>({
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

    _animateToSelected(index = this._index, direction?: -1 | 0 | 1, skip?: boolean) {
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

    override _focus() {
        this._animateToSelected(this._index, 0, true);
    }

    override _unfocus() {
        this.stage.gc();
    }

    override _handleLeft() {
        const item = this._items.pop();
        item.__shifted = true;
        this._items.unshift(item);
        this._animateToSelected(this._index, 1);
    }

    override _handleRight() {
        const item = this._items.shift();
        item.__shifted = true;
        this._items.push(item);
        this._animateToSelected(this._index, -1);
    }

    override _handleEnter() {
        const item = this.activeItem.item;
        Router.navigate(`details/${item.type}/${item.id}`, true);
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

    override _getFocused() {
        return this.activeItem;
    }
}