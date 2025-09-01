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

import {Lightning, Router, Utils} from "@lightningjs/sdk";

export default class Cast extends Lightning.Component {

    static  _template() {
        return {
            List: {
                alpha: 0.001,
                x: 110, mountY: 0.5, y: 520, h: 451,
                transitions: {
                    x: {duration: 0.6, delay: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    alpha: {duration: 0.6, delay: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                }
            }
        };
    };

    _active() {
        this.widgets.detailsmenu.select("cast", true);

        const src = Utils.asset("images/background.png");
        this.application.emit("setBackground", {src});
        this.application.emit("contentHeight", 640);

        this.tag("List").transition("alpha").on("finish", ()=> {
            this.application.emit("readyForBackground");
        });

        this.tag("List").patch({
            smooth: {alpha: 1, x: 90}
        });
    }

    set content(v) {
        if (v) {
            this.tag("List").childList.add(v);
        }
    }

    set detailsType(v) {
        this._detailsType = v;
    }

    set detailsId(v) {
        this._detailsId = v;
    }

    _handleUp() {
        Router.navigate(`details/${this._detailsType}/${this._detailsId}`, true);
        this.widgets.detailsmenu.select("details");
    }

    _handleDown() {
        Router.navigate(`similar/${this._detailsType}/${this._detailsId}`, true);
        this.widgets.detailsmenu.select("similar");
    }

    _getFocused() {
        return this.tag("List").children[0];
    }

}