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

export const fade = (i,o) =>{
    return new Promise((resolve)=>{
        i.patch({
            alpha:0, visible: true,
            smooth:{
                alpha: [1, {duration:1.1, delay:0.1}]
            }
        });
        // resolve on y finish
        i.transition("alpha").on("finish",()=>{
            if(o){
                o.visible = false;
            }
            resolve();
        });
    });
};

export const crossFade = (i, o)=>{
    return new Promise((resolve)=>{
        i.y = -100;
        i.patch({
            alpha:0, visible: true,
            smooth:{
                alpha: [1, {duration:1}],
                y: [0, {duration:1}]
            }
        });
        if(o){
            o.patch({
                smooth:{
                    alpha: [0, {duration:1}]
                }
            });
        }
        // resolve on y finish
        i.transition("alpha").on("finish",()=>{
            resolve();
        });
    });
};

export const up = (i, o)=>{
    return new Promise((resolve)=>{
        i.patch({
            y: 1080, visible: true,
            smooth:{
                y: [0, {duration:0.6, delay:0.1}]
            }
        });
        // out is optional
        if (o) {
            o.patch({
                y: 0,
                smooth:{
                    y: [-1080, {duration:0.6, delay:0.1}]
                }
            });
        }
        // resolve on y finish
        i.transition("y").on("finish",()=>{
            resolve();
        });
    });
}

export const left = (i ,o) =>{
    return new Promise((resolve)=>{
        i.patch({
            x: 1920, visible: true,
            smooth:{
                x: [0, {duration:1, delay:1}]
            }
        });
        // out is optional
        if (o) {
            o.patch({
                y: 0,
                smooth:{
                    x: [-1920, {duration:1, delay:1}]
                }
            });
        }
        // resolve on y finish
        i.transition("x").on("ready",()=>{
            resolve();
        });
    });
}