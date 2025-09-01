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

export default class MovieInfo extends Lightning.Component {

    static _template() {
        return {
            Date: {
                y: 8,
                text: {fontFace: "Regular", fontSize: 28, textColor: 0xff767676}
            },
            Genres: {
                y: 50,
                text: {fontFace: "Regular", fontSize: 24, textColor: 0xff21d07a}
            }
        };
    };

    _init() {
        this.listeners = {
            ratingColor: (color)=> {
                this.tag("Genres").text.textColor = color;
            }
        }
    }

    _attach() {
        ["ratingColor"].forEach((event)=>{
            this.application.on(event, this.listeners[event])
        });
    }

    _detach() {
        ["ratingColor"].forEach((event)=>{
            this.application.off(event, this.listeners[event])
        });
    }

    set info({date, genres}) {
        this.tag("Date").text = date;
        this.tag("Genres").text = genres;
    }
}