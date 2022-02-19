import {Lightning} from "@lightningjs/sdk";

export default class Title extends Lightning.Component {

    static _template() {
        return {};
    };

    _init() {
        this.on("txLoaded", ()=> {
            if (!this._titleLoaded) {
                this.application.emit("titleLoaded");
                this._titleLoaded = true;
            }
        });
    }

    set label(v) {
        this._titleLoaded = false;
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
            text: {fontFace: "Black", text: v, fontSize, lineHeight, wordWrapWidth: 1000}
        });
    }

}