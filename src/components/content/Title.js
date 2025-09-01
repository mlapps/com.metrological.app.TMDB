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

import {Lightning} from "@lightningjs/sdk";

export default class Title extends Lightning.Component {

    static _template() {
        return {};
    };

    _init() {
        this.on("txLoaded", ()=> {
            if (!this._skip) {
                this.application.emit("titleLoaded");
            }
        });
    }

    set skip(v) {
        this._skip = v;
    }

    set label(v) {
        let fontSize = 128;
        let lineHeight = 128;
        if (v.length > 12 && v.length < 24) {
            fontSize = 108;
            lineHeight = 118;
        } else if (v.length >= 24) {
            fontSize = 88;
            lineHeight = 98;
        }

        this.patch({
            text: {fontFace: "Black", fontSize, lineHeight, wordWrapWidth: 1000, text: v}
        });
    }

}