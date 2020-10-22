import {Img, Lightning} from "@lightningjs/sdk";
import {getImgUrl} from "./lib/tools";

export default class Background extends Lightning.Component{
    static _template() {
        return {
            Backgrounds: {
                BackgroundA: {
                    colorTop: 0xff717171, colorBottom: 0xff000000, scale: 1.2, alpha: 0,
                    transitions: {
                        zIndex: {duration: 2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                        alpha: {duration: 2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                        scale: {duration: 2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                    }
                },
                BackgroundB: {
                    colorTop: 0xff717171, colorBottom: 0xff000000,
                    transitions: {
                        zIndex: {duration: 2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                        alpha: {duration: 2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                        scale: {duration: 2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                    }
                }
            }
        };
    }

    _init() {
        this._backgroundIndex = 0;

        this.application.on("setItem", (item)=> {
            if (item === this._item) {
                return;
            }

            this._item = item;

            const image = getImgUrl(item.background, 1280);

            this.tag("Backgrounds").children[this._backgroundIndex].patch({
                texture: Img(image).contain(1920, 1080),
                smooth: {scale: 1, alpha: 1}
            });

            this._backgroundIndex ^= 1;

            this.tag("Backgrounds").children[this._backgroundIndex].patch({
                texture: null,
                smooth: {scale: 1.2, alpha: 0}
            });
        });
    }
}