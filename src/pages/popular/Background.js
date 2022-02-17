import {Img, Lightning} from "@lightningjs/sdk";
import {getImgUrl} from "../../lib/tools";

export default class Background extends Lightning.Component {

    static _template() {
        return {
            Backgrounds: {
                w: 1920, h: 1080, rtt: true,
                BackgroundA: {
                    colorLeft: 0x50ffffff, colorRight: 0x0090cea1,
                    transitions: {
                        alpha: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                    }
                },
                BackgroundB: {
                    colorLeft: 0x40ffffff, colorRight: 0x0090cea1,
                    transitions: {
                        alpha: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                    }
                }
            }
        };
    };
    
    _init() {
        this._index = 0;

        this.application.on("setItem", ({item})=> {
            clearTimeout(this._timeout);
            this._timeout = setTimeout(()=> {
                this._setBackground(item);
            }, 300);
        });
    }

    _setBackground(item) {
        if (item === this._item) {
            return;
        }

        const src = getImgUrl(item.background, 1280);

        this.tag("Backgrounds").children[this._index].patch({
            texture: Img(src).contain(1920, 1080),
            smooth: {
                alpha: 1
            }
        });
        this._index ^= 1;
        this.tag("Backgrounds").children[this._index].patch({
            smooth: {
                alpha: 0
            }
        });
    }

}