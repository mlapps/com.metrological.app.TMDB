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

import {Lightning, Router} from '@lightningjs/sdk';
import Content from "./Content";

export default class Popular extends Lightning.Component{

    static _template() {
        return {
            Content: {
                mountY: 0.5, y: 540, x: 90,
                type: Content
            },
            List: {}
        };
    }

    _init() {
        this._index = 0;

        this.listeners = {
            contentHidden: ()=> {
                this.widgets.menu.hide();
                Router.navigate(`details/${this._item.type}/${this._item.id}`, true);
            }
        }
    }

    _attach() {
        ["contentHidden", "readyForNavigate"].forEach((event)=>{
            this.application.on(event, this.listeners[event])
        });
    }

    _detach() {
        ["contentHidden", "readyForNavigate"].forEach((event)=>{
            this.application.off(event, this.listeners[event])
        });
    }

    _active() {
        this.widgets.menu.show();
    }

    set content(v) {
        if (v) {
            this.tag("List").childList.add(v);
        }
    }

    $firstItemCreated() {
        this._refocus();
    }

    _getFocused() {
        return this.selectedList;
    }

    get selectedList() {
        return this.tag("List").children[this._index];
    }

    $selectItem({item}) {
        this._item = item;
        Router.navigate(`details/${this._item.type}/${this._item.id}`, true);
    }

    historyState(params) {
        if (params) {
            this.selectedList.index = params.listIndex;
            this.selectedList.resetConfigIndex();
        } else {
            if (this.tag("List").children[this._index]) {
                return {listIndex: this.tag("List").children[this._index].index}
            }
        }
    }

}