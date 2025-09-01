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
import {Button, MovieInfo, Rating, Title} from "../../components";

export default class Content extends Lightning.Component {

    static _template() {
        return {
            alpha: 0.001,
            Title: {
                type: Title
            },
            Details: {
                Rating: {
                    type: Rating
                },
                MovieInfo: {
                    x: 120, y: 4,
                    type: MovieInfo
                }
            },
            Button: {
                type: Button, label: "Details"
            }
        };
    };

    _init() {
        this._detailAnimation = this.animation({duration: 0.6, actions: [
            {t: '', p: 'alpha', rv: 0, v: {0: {v: 0}, 1: {v: 1}}},
            {t: '', p: 'x', rv: 90, v: {0: {v: 130}, 1: {v: 90}}},
        ]});

        this._detailAnimation.on("finish", ()=> {
            this.application.emit("readyForBackground");
        });

        this.listeners = {
            titleLoaded: ()=> {
                this._detailAnimation.start();
                this.application.emit("contentHeight", this.tag("Title").renderHeight + 200);
                this.tag("Rating").startAnimation();
                this.h = this.tag("Title").renderHeight + 160;
                this.tag("Details").y = this.tag("Title").renderHeight - 20;
                this.tag("Button").y = this.tag("Title").renderHeight + 120;
                this._refocus();
            },
            setItem: ({item})=> {
                this._item = item;
            },
            itemAnimationEnded: ()=> {
                this._setDetails(this._item);
            }
        }

        this.transition("alpha").on("finish", ()=> {
           this.application.emit("contentHidden");
        });
    }

    _attach() {
        ["titleLoaded", "setItem", "itemAnimationEnded"].forEach((event)=>{
            this.application.on(event, this.listeners[event])
        });
    }

    _detach() {
        ["titleLoaded", "setItem", "itemAnimationEnded"].forEach((event)=>{
            this.application.off(event, this.listeners[event])
        });
    }

    _setDetails(item) {
        if (this._details === item) return;
        this._details = item;
        this._item =  item;
        this.alpha = 0.001;
        this.tag("Rating").voteAverage = item.voteAverage;
        this.tag("Title").label = item.title;
        this.tag("MovieInfo").info = {date: item.formattedReleaseDate, genres: item.genresAsString};
    }

    hide() {
        this.patch({
            smooth: {alpha: 0, x: 40},
            Button: {
                smooth: {alpha: 0, y: 60}
            }
        });

        ["titleLoaded", "setItem"].forEach((event)=>{
            this.application.off(event, this.listeners[event])
        });
    }

}