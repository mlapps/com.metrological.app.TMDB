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

export default class Button extends Lightning.Component {

    static _template() {
        return {
            color: 0xff21d07a, rtt: true,
            texture: Lightning.Tools.getRoundRect(180, 60, 30, 0, 0xff21d07a, true, 0xffffffff),
            transitions: {
                alpha: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                y: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
            },
            Button: {
                x: 5, y: 5,
                texture: Lightning.Tools.getRoundRect(50, 50, 25, 0, 0xff21d07a, true, 0xff081C22),
                Ok: {
                    mount: 0.5, x: 26, y: 28,
                    text: {text: "OK", fontFace: "Regular", fontSize: 19}
                }
            },
            Label: {
                mount: 0.5, x: 114, y: 33,
                text: {text: "Details", fontFace: "Regular", fontSize: 24, textColor: 0xff081C22}
            }
        };
    };

    _init() {
        this.listeners = {
            ratingColor: (color)=> {
                this.color = color;
            }
        }
    }

    set label(v) {
        this.tag("Label").text = v;
    }

    _active() {
        ["ratingColor"].forEach((event)=>{
            this.application.on(event, this.listeners[event])
        });
    }

    _inactive() {
        ["ratingColor"].forEach((event)=>{
            this.application.off(event, this.listeners[event])
        });
    }

}