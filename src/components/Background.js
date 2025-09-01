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

import {Img, Lightning, Router, Utils} from "@lightningjs/sdk";
import {getImgUrl} from "../lib/tools";

export default class Background extends Lightning.Component {

    static _template() {
        return {
            Backgrounds: {
                w: 1920, h: 1080,
                BackgroundA: {
                    colorLeft: 0x50ffffff, colorRight: 0x0090cea1
                },
                BackgroundB: {
                    colorLeft: 0x40ffffff, colorRight: 0x0090cea1
                }
            }
        };
    };
    
    _init() {
        this._index = 0;

        this.tag("BackgroundA").on("txLoaded", ()=> {
            this.tag("BackgroundA").setSmooth("alpha", 1, {duration: 0.6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'});
            this.tag("BackgroundB").setSmooth("alpha", 0, {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'});
        });

        this.tag("BackgroundB").on("txLoaded", ()=> {
            this.tag("BackgroundB").setSmooth("alpha", 1, {duration: 0.6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'});
            this.tag("BackgroundA").setSmooth("alpha", 0, {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'});
        });

        this.tag("BackgroundA").transition("alpha").on("finish", ()=> {
            if (this._index === 0) {
                this.application.emit("backgroundLoaded");
            }
        });

        this.tag("BackgroundB").transition("alpha").on("finish", ()=> {
            if (this._index === 1) {
                this.application.emit("backgroundLoaded");
            }
        });

        this.listeners = {
            setBackground: ({src})=> {
                this._item = null;
                this._skip = false;
                this._src = src;
            },
            readyForBackground: ()=> {
                if (!this._skip) {
                    this._setBackground(this._src);
                }
            },
            setItem: ({item})=> {
                if (this._item && item.background === this._item.background) {
                    this._skip = true;
                    return;
                }
                this._skip = false;
                this._item = item;

                let src = Utils.asset("images/background.png");
                if (this._item.background) {
                    src = getImgUrl(this._item.background, 1280);
                }

                this._src = src;
            }
        }
    }

    _attach() {
        ["setBackground", "setItem", "readyForBackground"].forEach((event)=>{
            this.application.on(event, this.listeners[event])
        });
    }

    _detach() {
        ["setBackground", "setItem", "readyForBackground"].forEach((event)=>{
            this.application.off(event, this.listeners[event])
        });
    }

    _setBackground(src) {
        if (src === this._lastSrc) return;
        this._lastSrc = src;

        this.tag("Backgrounds").children[this._index].patch({
            texture: Img(src).contain(1920, 1080),
            alpha: 0.001
        });
        this._index ^= 1;
    }
}