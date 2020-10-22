import {Img, Lightning} from "@lightningjs/sdk";
import CircleProgressShader from "../../shader/CircleProgressShader";
import {getImgUrl} from "../../lib/tools";

export default class Item extends Lightning.Component {

    static _template() {
        return {
            w: Item.width, h: Item.height,
            Poster: {
                w: w=>w, h: h=>h, pivotY: .7, rtt: true,
                shader: {type: Lightning.shaders.RoundedRectangle, radius: 10},
                transitions: {
                    w: {duration: .6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    h: {duration: .6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                },
                Image: {
                    w: w=>w, h: h=>h, scale: 1.2, color: 0xff2f2f2f,
                    transitions: {
                        w: {duration: .6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                        h: {duration: .6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                    }
                },
                BorderLeft: {
                    w: 2, h: h=>h, rect: true, color: 0x40ffffff
                },
                Rating: {
                    mountX: .5, mountY: 1, x: w=>w / 2, y: 360,
                    transitions: {
                        y: {duration: .6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                    },
                    texture: Lightning.Tools.getRoundRect(70, 70, 35, 0, 0x00ffffff, true, 0xff081C22),
                    RatingNumber: {
                        mount: .5, x: w=>w / 2 + 4, y: h=>h / 2 + 2,
                        flex: {},
                        Number: {
                            text: {text: '0', fontSize: 26, fontFace: "SourceSansPro-Bold"}
                        },
                        Percentage: {
                            flexItem: {marginTop: 6},
                            text: {text: '%', fontSize: 12, fontFace: "SourceSansPro-Regular"}
                        }
                    },
                    RatingCircle: {
                        rect:true, color: 0x00ffffff, rtt:true, mount: .5, x: 36, y: 36, w: 60, h: 60, rotation: Math.PI * .5,
                        shader: {
                            type: CircleProgressShader, radius: 30, width: 3, angle: 0.0001, smooth: 0.005, color: 0xffd1215c, backgroundColor: 0xff204529
                        }
                    }
                }
            }
        };
    }

    _init() {
        this._angle = 0.001;
        this._ratingNumber = 0;

        this._focusAnimation = this.tag("Rating").animation({
            duration: 1.2, stopDuration: .2, stopMethod: "immediate", actions:[
                {t: 'RatingCircle', p:'shader.angle', rv: 0.0001, v: () => {
                        if (this._angle < this._item.voteAverage / 10) {
                            this._angle += 0.01;
                        }

                        if (this._angle < 0.4) {
                            this.tag("RatingCircle").shader.color = 0xffd1215c;
                        } else if (this._angle > 0.4 && this._angle < 0.6) {
                            this.tag("RatingCircle").shader.color = 0xffd2d531;
                        } else if (this._angle > 0.6) {
                            this.tag("RatingCircle").shader.color = 0xff21d07a;
                        }

                        return this._angle;
                    }},
                {t: 'Number', p:'text.text', rv: 0, v: () => {
                        if (this._ratingNumber < this._item.voteAverage * 10) {
                            this._ratingNumber += 1;
                        }
                        return `${Math.floor(this._ratingNumber)}`;
                    }}
            ]
        });
    }

    set item(v) {
        this._item = v;

        const image = getImgUrl(this._item.poster, 500);

        this.patch({
            Poster: {
                Image: {
                    texture: Img(image).contain(180 * 1.2, 270 * 1.2)
                }
            }
        });
    }

    set index(v) {
        this._index = v;

        if (this._index < 8) {
            this.tag("Image").color = 0xffffffff;
        }
    }

    _focus() {
        this._angle = 0.001;
        this._ratingNumber = 0;

        this.patch({
            Poster: {
                smooth: {scale: 1.2},
                Image: {
                    smooth: {scale: 1}
                },
                Rating: {
                    smooth: {y: 250}
                }
            }
        });

        this._focusAnimation.start();
        this.application.emit("setItem", this._item);
    }

    _unfocus() {
        this.patch({
            Poster: {
                smooth: {scale: 1},
                Image: {
                    smooth: {scale: 1.2}
                },
                Rating: {
                    smooth: {y: 360}
                }
            }
        });

        this._focusAnimation.stop();
    }

    static get width() {
        return 180;
    }

    static get height(){
        return 270;
    }

    static get offset() {
        return 40;
    }

}