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

import {Img, Lightning, Router, Utils} from "@lightningjs/sdk";
import {getImgUrl} from "../../lib/tools";
import PerspectiveShader from "../../shader/PerspectiveShader";
import {ITEM_CONFIGS} from "./ItemConfigs";

export default class Item extends Lightning.Component {

    static _template() {
        return {
            w: Item.width, h: Item.height, alpha: 0,
            transitions: {
                alpha: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
            },
            Blur: {
                w: Item.width, h: Item.height, rtt: true,
                type: Lightning.components.FastBlurComponent, amount: 0,
                transitions: {
                    amount: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    zIndex: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    x: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    y: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                },
                content: {
                    Perspective: {
                        w: Item.width, h: Item.height, rtt: true,
                        shader: {type: PerspectiveShader, rx: 0, ry: 0},
                        Poster: {
                            w: Item.width, h: Item.height, rtt: true, alpha: 0.001,
                            transitions: {
                                scale: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                            },
                            shader: {type: Lightning.shaders.RoundedRectangle, radius: 18},
                            Image: {
                                w: w=>w, h: h=>h,
                                transitions: {
                                    alpha: {duration: 0.3}
                                }
                            },
                            Border: {
                                x: -4, y: -4,
                                colorBottom: 0xff121212, colorTop: 0xff434343,
                                texture: Lightning.Tools.getRoundRect(Item.width,Item.height,18,3,0xffffffff,false,0xffffffff)
                            }
                        }
                    }
                }
            }
        };
    }

    _init() {
        this._perspectiveAnimation = this.tag("Blur").content.animation({
            duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)', actions:[
                {t: 'Perspective', p: 'shader.rx', v: (e)=> {
                    const {rx} = ITEM_CONFIGS[this.configIndex];
                    return e * (rx.e-rx.s)+rx.s;
                }}
            ]
        });

        this.tag("Blur").transition("zIndex").on("finish", ()=> {
            if (this._focusedItem) {
                this.application.emit("itemAnimationEnded");
            }
        });

        this.tag("Blur").content.tag("Image").on("txLoaded", ()=> {
            this.tag("Blur").content.tag("Poster").alpha = 1;
        });

        this.tag("Blur").content.tag("Image").on("txUnloaded", ()=> {
            this.tag("Blur").content.tag("Poster").alpha = 0.001;
        });

        this._resetPosition();
    }

    set focusedItem(v) {
        this._focusedItem = v;
    }

    set item(v) {
        this._item = v;

        const content = this.tag("Blur").content;
        if (this._item.poster !== null) {
            const image = getImgUrl(this._item.poster, 500);
            content.tag("Image").texture = Img(image).contain(342, 513);
        } else {
            content.tag("Image").src = Utils.asset("images/placeholder.png");
        }
    }

    set index(v) {
        this._index = v;
    }

    get configIndex() {
        return this.parent.configIndex;
    }

    animatePosition() {
        const {alpha, scale, x, y, color, amount, zIndex} = ITEM_CONFIGS[this.configIndex];

        this.patch({
            alpha,
            Blur: {
                amount,
                smooth: {zIndex, x, y},
                content: {
                    Perspective: {
                        Poster: {
                            smooth: {scale},
                            Image: {
                                color
                            }
                        }
                    }
                }
            }
        });

        this._perspectiveAnimation.start();
    }

    _resetPosition() {
        const {alpha, scale, x, y, color, amount, zIndex, rx} = ITEM_CONFIGS[this.configIndex];
        this.patch({
            alpha,
            Blur: {
                amount, zIndex, x, y,
                content: {
                    Perspective: {
                        shader: {type: PerspectiveShader, rx: rx.e, ry: 0.05},
                        Poster: {
                            scale,
                            Image: {
                                color
                            }
                        }
                    }
                }
            }
        });
        this.application.emit("itemAnimationEnded");
    }

    _handleEnter() {
        this.fireAncestors("$selectItem", {item: this._item});
    }

    static get width() {
        return 342;
    }

    static get height(){
        return 513;
    }

    static get offset() {
        return 0;
    }

}