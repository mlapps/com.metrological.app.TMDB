import { Lightning } from '@lightningjs/sdk'
import { GenericItemConstructorBase, ItemType } from './ItemTypes';

interface ItemWrapperTemplateSpec<ItemConstructor extends GenericItemConstructorBase = GenericItemConstructorBase> extends Lightning.Component.TemplateSpecStrong {
    index: number;
    construct: Lightning.Component.Constructor;
    item: ItemType<ItemConstructor> | undefined;
    configIndex: number;
}

export default class ItemWrapper<ItemConstructor extends GenericItemConstructorBase>
    extends Lightning.Component<ItemWrapperTemplateSpec<ItemConstructor>>
    implements Lightning.Component.ImplementTemplateSpec<ItemWrapperTemplateSpec<ItemConstructor>>
{
    // !!! Had to rename from `_construct` to `___construct` due to _construct (and __construct) being a
    // reserved word within Lightning.Component
    private ___construct!: ItemConstructor;
    private _index: number = 0;
    private _configIndex: number = 0;
    private _item: ItemType<ItemConstructor> | undefined;
    private _notifyOnItemCreation: boolean = false;

    static FIRST_CREATED = false;

    static override _template(): Lightning.Component.Template<ItemWrapperTemplateSpec> {
        return {
            clipbox: true
        };
    }

    set index(v) {
        this._index = v;
    }

    get index() {
        return this._index;
    }

    get configIndex() {
        return this._configIndex;
    }

    set configIndex(v) {
        this._configIndex = v;
    }

    set construct(v: ItemConstructor){
        this.___construct = v;
    }

    get construct() {
        return this.___construct;
    }

    set item(obj: ItemType<ItemConstructor> | undefined) {
        this._item = obj;
    }

    get item(): ItemType<ItemConstructor> | undefined {
        return this._item;
    }

    get child(): InstanceType<ItemConstructor> {
        return this.children[0] as unknown as InstanceType<ItemConstructor>;
    }

    create() {
        const item = this._item;
        this.children = [{type: this.___construct, item, index: this._index}];

        // if item is flagged and has focus, notify parent
        // that focuspath can be recalculated
        if(this._notifyOnItemCreation && this.hasFocus()){
            this.fireAncestors("$itemCreated");
            this._refocus();
        }
    }

    override _firstActive() {
        this.create();

        if(!ItemWrapper.FIRST_CREATED){
            this.fireAncestors("$firstItemCreated");
            ItemWrapper.FIRST_CREATED = true;
        }
    }

    override _getFocused() {
        // due to lazy creation there is the possibility that
        // an component receives focus before the actual item
        // is created, therefore we set a flag
        if(!this.child){
            this._notifyOnItemCreation = true;
        }else{
            return this.child;
        }

    }
}
