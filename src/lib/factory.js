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

import {Item, FlipList, Actor, List} from "../components";
import {Container, Details, Cast, People} from "./models";

let stage;
const models = new Map();
const listComponents = new Map();
const itemComponents = new Map();

models.set("movie", Container);
models.set("tv", Container);
models.set("cast", Cast);

listComponents.set("movie", FlipList);
listComponents.set("tv", FlipList);
listComponents.set("cast", List);

itemComponents.set("movie", Item);
itemComponents.set("tv", Item);
itemComponents.set("cast", Actor);

export const init = (stageInstance) =>{
    stage = stageInstance;
};

export const list = (type, data, genres) => {
    const container = models.get(type);
    const model = new container(data, type, genres);

    if (model.items.length === 0) {
        return null;
    } else {
        return stage.c({
            type: listComponents.get(type),
            itemConstruct: itemComponents.get(type),
            items: model.items
        });
    }
};

export const details = (data) => {
    return new Details(data);
};

export const people = (data) => {
    return new People(data);
};