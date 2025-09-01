/*
 * Copyright 2020 Metrological
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

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

    get configIndex() {
        return this._configIndex;
    }

    set configIndex(v) {
        this._configIndex = v;
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

    get child(){
        return this.children[0];
    }

    create() {
        const item = this._item;
        this.children = [{type: this._construct, item, index: this._index}];

        // if item is flagged and has focus, notify parent
        // that focuspath can be recalculated
        if(this._notifyOnItemCreation && this.hasFocus()){
            this.fireAncestors("$itemCreated");
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