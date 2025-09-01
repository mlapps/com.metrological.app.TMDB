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

import Popular from "./popular";
import {Router} from "@lightningjs/sdk";

export default class TvCredits extends Popular {
    _active() {
        this.widgets.peoplemenu.select("tvcredits", true);
    }

    set peopleId(v) {
        this._peopleId = v;
    }

    _handleUp() {
        this.widgets.peoplemenu.select("moviecredits");
        Router.navigate(`movie_credits/movie/${this._peopleId}`, true);
    }

    _getFocused() {
        return this.tag("List").children[this._index];
    }
}