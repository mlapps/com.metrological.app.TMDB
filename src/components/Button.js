import {Lightning} from "@lightningjs/sdk";

export default class Button extends Lightning.Component {

    static _template() {
        return {
            flexItem: {marginTop: 30},
            color: 0xff21d07a, rtt: true,
            texture: Lightning.Tools.getRoundRect(180, 60, 30, 0, 0xff21d07a, true, 0xffffffff),
            transitions: {
                alpha: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                y: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
            },
            Button: {
                x: 5, y: 5,
                texture: Lightning.Tools.getRoundRect(50, 50, 25, 0, 0xff21d07a, true, 0xff081C22),
                Ok: {
                    mount: 0.5, x: 26, y: 28,
                    text: {text: "OK", fontFace: "Regular", fontSize: 19}
                }
            },
            Label: {
                mountY: 0.5, x: 74, y: 32,
                text: {text: "Details", fontFace: "Regular", fontSize: 24, textColor: 0xff081C22}
            }
        };
    };

    _init() {
        this.listeners = {
            ratingColor: (color)=> {
                this.color = color;
            }
        }
    }

    _active() {
        ["ratingColor"].forEach((event)=>{
            this.application.on(event, this.listeners[event])
        });
    }

    _inactive() {
        ["ratingColor"].forEach((event)=>{
            this.application.off(event, this.listeners[event])
        });
    }

}