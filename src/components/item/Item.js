import {Img, Lightning} from "@lightningjs/sdk";
import {getImgUrl} from "../../lib/tools";
import PerspectiveShader from "../../shader/PerspectiveShader";

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
                            w: Item.width, h: Item.height, rtt: true,
                            transitions: {
                                scale: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                            },
                            shader: {type: Lightning.shaders.RoundedRectangle, radius: 18},
                            Image: {
                                w: w=>w, h: h=>h,
                                transitions: {
                                    color: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                                }
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
                    const {rx} = ITEM_CONFIGS[this._configIndex];
                    return e * (rx.e-rx.s)+rx.s;
                }}
            ]
        });

        this._resetPosition();
    }

    set item(v) {
        this._item = v;

        const image = getImgUrl(this._item.poster, 500);
        const content = this.tag("Blur").content;
        content.tag("Image").texture = Img(image).contain(342, 513);
    }

    set index(v) {
        this._index = v;
    }

    set configIndex(v) {
        this._configIndex = v;
    }

    animatePosition() {
        const {alpha, scale, x, y, color, amount, zIndex} = ITEM_CONFIGS[this._configIndex];

        this.patch({
            smooth: {alpha},
            Blur: {
                smooth: {amount, zIndex, x, y},
                content: {
                    Perspective: {
                        Poster: {
                            smooth: {scale},
                            Image: {
                                smooth: {color}
                            }
                        }
                    }
                }
            }
        });

        this._perspectiveAnimation.start();
    }

    _resetPosition() {
        const {alpha, scale, x, y, color, amount, zIndex, rx} = ITEM_CONFIGS[this._configIndex];
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

const ITEM_CONFIGS = [
    {
        amount: 1,
        rx: {s: 0.3, e: 0},
        scale: 0.8,
        zIndex: 3,
        alpha: 0,
        x: 0,
        y: 200,
        color: 0xff757575
    },
    {
        amount: 0,
        rx: {s: 0.6, e: 0.3},
        scale: 1,
        zIndex: 4,
        alpha: 1,
        x: 0,
        y: 0,
        color: 0xffffffff
    },
    {
        amount: 1,
        rx: {s: 0.8, e: 0.6},
        scale: 0.6,
        zIndex: 3,
        alpha: 1,
        x: 200,
        y: 0,
        color: 0xff757575
    },
    {
        amount: 1.5,
        rx: {s: 1, e: 0.8},
        scale: 0.45,
        zIndex: 2,
        alpha: 1,
        x: 300,
        y: 0,
        color: 0xff757575
    },
    {
        amount: 2,
        rx: {s: 1, e: 1},
        scale: 0.45,
        zIndex: 1,
        alpha: 0,
        x: 400,
        y: 0,
        color: 0xff757575
    }
]