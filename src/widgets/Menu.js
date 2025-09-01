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

import {Lightning} from '@lightningjs/sdk';

export default class Menu extends Lightning.Component {

    static _template() {
        return {
            Lines: {
                Top: {
                    x: -12, w: 2, rect: true, color: 0x50ffffff
                },
                Bottom: {
                    y: 790, mountY: 1, x: -12, w: 2, rect: true, color: 0x50ffffff
                }
            },
            Items: {}
        };
    }

    _init() {
        this._id = null;
        this.application.on("contentHeight", (h)=> {
            if (h === 0) {
                this.tag("Top").setSmooth("h", 400, {duration: 0.3, timingFunction: 'cubic-bezier(.21,.5,.48,.93)'});
                this.tag("Bottom").setSmooth("h", 390, {duration: 0.3, timingFunction: 'cubic-bezier(.21,.5,.48,.93)'});
            } else {
                this.tag("Top").setSmooth("h", 440-this._lineOffset-(h/2)-(this._currentIndex*48), {duration: 0.3, timingFunction: 'cubic-bezier(.21,.5,.48,.93)'});
                this.tag("Bottom").setSmooth("h", 330+this._lineOffset-(h/2)+(this._currentIndex*48), {duration: 0.3, timingFunction: 'cubic-bezier(.21,.5,.48,.93)'});
            }
        })
    }

    set items(v) {
        this.tag("Items").children = v.map(({label, id, selected})=>{
            return {
                type: MenuItem, label, id, selected
            }
        });
    }

    select(id, fastForward) {
        if (id === this._id) return;

        this._id = id;
        let y = 0;

        this.tag("Items").children.forEach((item, index) => {
            item.setSmooth("y", y, {duration: fastForward?0:0.3});
            if (id === item.id) {
                this._currentIndex = index;
                this.tag("Lines").setSmooth("y", (index+1)*48, {duration: fastForward?0:0.3, timingFunction: 'cubic-bezier(.21,.5,.48,.93)'});
                y += 810;
            }
            y += 48;
            item.selected = item.id === id;
        });

        this.tag("Top").setSmooth("h", 400, {duration: 0.3, timingFunction: 'cubic-bezier(.94,.42,.49,.99)'});
        this.tag("Bottom").setSmooth("h", 390, {duration: 0.3, timingFunction: 'cubic-bezier(.94,.42,.49,.99)'});
    }

    set lineOffset(v) {
        this._lineOffset = v;
    }

    show() {
        this.patch({
            smooth: {alpha: 1, x: 90}
        });
    }

    hide() {
        this.patch({
            smooth: {alpha: 0, x: 60}
        });
    }

}

class MenuItem extends Lightning.Component {
    static _template() {
        return {
            Label: {
                text: {fontSize: 28, fontFace: "Regular"}
            }
        };
    }

    set label(v) {
        this._label = v;

        this.patch({
            Label: {
                text: {text: this._label}
            }
        });
    }

    set selected(v) {
        this.tag("Label").color = v?0xffffffff:0xff767676;
    }

    set id(v) {
        this._id = v;
    }

    get id() {
        return this._id;
    }
}