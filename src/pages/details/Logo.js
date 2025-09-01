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

import {Img, Lightning} from "@lightningjs/sdk";

export default class Logo extends Lightning.Component {
    static _template() {
        return {
            colorTop: 0xffc3c3c3, colorBottom: 0xffffffff,
            texture: Lightning.Tools.getRoundRect(120, 120, 60, 0, 0xffffffff, true, 0xffffffff),
            mountX: 1, rtt: true,
            Logo: {
                mount: 0.5, x: 60, y: 60
            }
        };
    }

    set logo(v) {
        this.tag("Logo").texture = Img(`https://image.tmdb.org/t/p/w300/${v}`).contain(80, 60);
    }
}