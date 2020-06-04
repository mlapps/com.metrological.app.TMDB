import {Lightning} from "wpe-lightning-sdk";

export default class Button extends Lightning.Component {

    static _template() {
        return {
            flex: {},
            Background: {
                flex: {},
                rtt: true, shader: {type: Lightning.shaders.RoundedRectangle, radius: 14},
                rect: true, color: 0xff404249,
                transitions: {
                    color: {duration: .6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.30, 1.00)'},
                    scale: {duration: .6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.30, 1.00)'}
                },
                Label: {
                    flexItem: {marginLeft: 80, marginRight: 80, marginTop: 15, marginBottom: 10},
                    text: {fontFace: "SourceSansPro-Regular", fontSize: 32},
                    transitions: {
                        color: {duration: .6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.30, 1.00)'},
                        scale: {duration: .6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.30, 1.00)'}
                    }
                }
            }
        };
    }

    set label(v) {
        this._label = v;

        this.tag("Label").patch({
            text: {text: this._label}
        });
    }

    _focus() {
        this.patch({
            Background: {
                smooth: {color: 0xff03b3e4},
                Label: {
                    smooth: {color: 0xffffffff},
                }
            }
        });
    }

    _unfocus() {
        this.patch({
            Background: {
                smooth: {color: 0xff404249},
                Label: {
                    smooth: {color: 0xffffffff},
                }
            }
        });
    }

}