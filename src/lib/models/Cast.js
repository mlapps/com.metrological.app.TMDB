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

export default class Cast {
    constructor(obj, type){
        this._cast = obj.cast;
        this._crew = obj.crew;
        this._id = obj.id;
        this._type = type;
    }

    get items() {
        return this._cast;
    }

    get type() {
        return this._type;
    }

    get cast() {
        return this._cast;
    }

    get crew() {
        return this._crew;
    }

    get id() {
        return this._id;
    }
}