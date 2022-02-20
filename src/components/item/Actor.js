import {Img, Lightning} from "@lightningjs/sdk";
import {getImgUrl} from "../../lib/tools";

export default class Actor extends Lightning.Component {

    static _template() {
        return {
            Actor: {
                w: Actor.width, h: Actor.height, rtt: true, mount: 0.5, x: Actor.width/2, y: Actor.height/2,
                scale: 0.98,
                shader: {type: Lightning.shaders.RoundedRectangle, radius: 18},
                transitions: {
                    scale: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                },
                Image: {
                    w: 300, h: 451,
                    mount: 0.5, x: Actor.width/2, y: Actor.height/2,
                    shader: {type: Lightning.shaders.Grayscale, amount: 1},
                    transitions: {
                        color: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                    }
                }
            },
            ActorInfo: {
                flex: {direction: "column"},
                y: Actor.height + 6,
                transitions: {
                    y: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                },
                Name: {
                    x: Actor.width/2, mountX: 0.5,
                    text: {fontFace: "Bold", fontSize: 24, wordWrapWidth: Actor.width, textAlign: "center", textColor: 0xffc3c3c3}
                },
                Character: {
                    x: Actor.width/2, mountX: 0.5,
                    text: {fontFace: "Regular", fontSize: 21, textAlign: "center", textColor: 0xff9f9f9f, wordWrapWidth: Actor.width, lineHeight: 31, maxLines: 2}
                }
            }
        };
    }

    set item(v) {
        this._item = v;

        if (this._item.profile_path !== null) {
            const image = getImgUrl(this._item.profile_path, 300)
            this.tag("Image").texture = Img(image).landscape(Actor.width);
        }

        this.tag("Name").text = this._item.name;
        this.tag("Character").text = this._item.character;
    }

    _focus() {
        this.patch({
            Actor: {
                smooth: {scale: 1},
                Image: {
                    smooth: {"shader.amount": 0}
                }
            },
            ActorInfo: {
                smooth: {y: Actor.height + 16},
                Name: {
                    smooth: {
                        "text.textColor": 0xffffffff
                    }
                },
                Character: {
                    smooth: {
                        "text.textColor": 0xffc3c3c3
                    }
                }
            }
        });
    }

    _unfocus() {
        this.patch({
            Actor: {
                smooth: {scale: 0.98},
                Image: {
                    smooth: {"shader.amount": 1}
                }
            },
            ActorInfo: {
                smooth: {y: Actor.height + 6},
                Name: {
                    smooth: {
                        "text.textColor": 0xffc3c3c3
                    }
                },
                Character: {
                    smooth: {
                        "text.textColor": 0xff9f9f9f
                    }
                }
            }
        });
    }

    static get width() {
        return 300;
    }

    static get height(){
        return 451;
    }

    static get offset() {
        return 40;
    }

}