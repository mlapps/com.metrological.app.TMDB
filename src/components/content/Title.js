import {Lightning} from "@lightningjs/sdk";

export default class Title extends Lightning.Component {

    static _template() {
        return {};
    };

    _init() {
        this.on("txLoaded", ()=> {
            if (!this._skip) {
                this.application.emit("titleLoaded");
            }
        });
    }

    set skip(v) {
        this._skip = v;
    }

    set label(v) {
        let fontSize = 128;
        let lineHeight = 128;
        if (v.length > 12 && v.length < 24) {
            fontSize = 108;
            lineHeight = 118;
        } else if (v.length >= 24) {
            fontSize = 88;
            lineHeight = 98;
        }

        this.patch({
            text: {fontFace: "Black", fontSize, lineHeight, wordWrapWidth: 1000, text: v}
        });
    }

}