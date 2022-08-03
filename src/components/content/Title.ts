import lng from "@lightningjs/core";
import {Lightning} from "@lightningjs/sdk";

interface TitleTemplateSpec extends lng.Component.TemplateSpec {
    skip: boolean;
    label: string;
}

export default class Title
    extends Lightning.Component<TitleTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<TitleTemplateSpec> {

    private _skip = false;

    static override _template(): Lightning.Component.Template<TitleTemplateSpec> {
        return {};
    };

    override _init() {
        this.on("txLoaded", ()=> {
            if (!this._skip) {
                this.application.emit("titleLoaded");
            }
        });
    }

    set skip(v: boolean) {
        this._skip = v;
    }

    set label(v: string) {
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