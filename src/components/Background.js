import {Img, Lightning} from "@lightningjs/sdk";
import {getImgUrl} from "../lib/tools";

export default class Background extends Lightning.Component {

    static _template() {
        return {
            Backgrounds: {
                w: 1920, h: 1080,
                BackgroundA: {
                    colorLeft: 0x50ffffff, colorRight: 0x0090cea1
                },
                BackgroundB: {
                    colorLeft: 0x40ffffff, colorRight: 0x0090cea1
                }
            }
        };
    };
    
    _init() {
        this._index = 0;

        this.tag("BackgroundA").on("txLoaded", ()=> {
            this.tag("BackgroundA").setSmooth("alpha", 1, {duration: 0.6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'});
        });

        this.tag("BackgroundB").on("txLoaded", ()=> {
            this.tag("BackgroundB").setSmooth("alpha", 1, {duration: 0.6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'});
        });

        this.application.on("setItem", ({item})=> {
            if (this._item && item.background === this._item.background) {
                return;
            }
            this._item = item;

            clearTimeout(this._timeout);
            this._timeout = setTimeout(()=> {
                this._setBackground(item);
            }, 600);
        });
    }

    _setBackground(item) {
        const src = getImgUrl(item.background, 1280);

        this.tag("Backgrounds").children[this._index].patch({
            texture: Img(src).contain(1920, 1080),
            alpha: 0.001
        });
        this._index ^= 1;
        this.tag("Backgrounds").children[this._index].patch({
            smooth: {
                alpha: [0, {duration: 0.4, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}]
            }
        });
    }

}