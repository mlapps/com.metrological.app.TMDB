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

import {Lightning, Router} from "@lightningjs/sdk";

export default class Error extends Lightning.Component{
    static _template(){
        return {
            rect: true, w: 1920, h: 1080,
            color: 0xffb70606,
            Label:{
                x: 100, y: 100,
                text:{
                    text:'Error', fontSize:22
                }
            }
        }
    }

    _handleEnter(){
        Router.navigate("main")
    }

    _focus(){
        console.log("focus error page")
    }

    set error(obj){
        const {page, error} = obj;
        console.log(page, error);

        const errorMessage = `
error while loading page: ${page.constructor.name}
press enter to navigate to home
--
loaded via hash: ${page[Symbol.for("hash")]}
resulted in route: ${page[Symbol.for("route")]}
--
${error.toString()}`

        this.tag("Label").text = errorMessage;
    }

    easing(){
        return "up";
    }
}