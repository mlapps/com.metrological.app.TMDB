import { Lightning } from '@lightningjs/sdk'

export default class ItemWrapper extends Lightning.Component {
    static _template() {
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

    set construct(v){
        this._construct = v;
    }

    get construct() {
        return this._construct;
    }

    set item(obj) {
        this._item = obj;
    }

    get item() {
        return this._item;
    }

    set lngItem(v) {
        this._realItem = v;
    }

    get lngItem() {
        return this._realItem;
    }

    get child(){
        return this.children[0];
    }

    create() {
        const item = this._item;
        this.children = [{type: this._construct, item, index: this._index}];

        // if item is flagged and has focus, notify parent
        // that focuspath can be recalculated
        if(this._notifyOnItemCreation && this.hasFocus()){
            this._refocus();
        }
    }

    _firstActive() {
        this.create();

        if(!ItemWrapper.FIRST_CREATED){
            this.fireAncestors("$firstItemCreated");
            ItemWrapper.FIRST_CREATED = true;
        }
    }

    _getFocused() {
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

ItemWrapper.FIRST_CREATED = false;