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

import {Movie, Tv} from "./";

export default class Container {
    constructor(obj, type, genres){
        this._page = obj.page;
        this._total_results = obj.total_results;
        this._type = type;
        this._items = obj.results.map(item => {
            switch (type) {
                case "movie":
                    return new Movie(item, genres);
                case "tv":
                    return new Tv(item, genres);
            }
        });
    }

    get page() {
        return this._page;
    }

    get total() {
        return this._total_results;
    }

    get type() {
        return this._type;
    }

    get items() {
        return this._items;
    }
}