import {Lightning, Router, Utils} from "@lightningjs/sdk";

interface CorrectColorEvent {
    settings: {
        b: number,
        c: number,
        s: 'Protanopia' | 'Deuteranopia' | 'Tritanopia' | 'ColorShift' | 'Achromatopsia' | null,
        i: number
    }
}

const settings: CorrectColorEvent['settings'] = {
    b: 0,
    c: 100,
    s: null,
    i: 1
}

declare module "@lightningjs/sdk" {
    namespace Lightning {
        namespace Stage {
            interface EventMap {
                correctColor: (evt: CorrectColorEvent) => void
            }
        }
    }
}

interface AccessibilityTemplateSpec extends Lightning.Component.TemplateSpecStrong {
    Example: {},
    Options: {
        Filter: typeof OptionItem
    }
}

export default class Accessibility
    extends Lightning.Component<AccessibilityTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<AccessibilityTemplateSpec> {
    static _template(): Lightning.Component.Template<AccessibilityTemplateSpec> {
        return {
            x: 110, alpha: 0.001,
            transitions: {
                x: {duration: 0.6, delay: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                alpha: {duration: 0.6, delay: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
            },
            Example: {
                y: 300,
                src: Utils.asset("images/example.png")
            },
            Options: {
                y: 780,
                Filter: {
                    type: OptionItem,
                    index: 0,
                    label: "Color correction",
                    options: ["Trichromacy (normal)", "Protanopia", "Deuteranopia", "Tritanopia", "Achromatopsia"],
                    onChange: function (selected) {
                        settings.s = selected as CorrectColorEvent['settings']['s'];
                        this.stage.emit('correctColor', {settings});
                    }
                }
            }
        };
    }

    Example = this.getByRef('Example')!;
    Options = this.getByRef('Options')!;
    private _index = 0;
    private _optionsIndex = 0;

    _active() {
        const state = Router.getHistoryState("accessibility");
        if (state) {
            this.selectedOption.index = state.optionsIndex || 0;
            this.selectedOption.update();
        }

        this.widgets.menu.select("accessibility", true);
        const src = Utils.asset("images/background.png");
        this.application.emit("setBackground", {src});
        this.application.emit("contentHeight", 580);

        this.transition("alpha").on("finish", ()=> {
            this.application.emit("readyForBackground");
        });

        this.patch({
            smooth: {alpha: 1, x: 90}
        });
    }

    _handleUp() {
        this.widgets.menu.select("tv");
        Router.navigate(`tv`);
    }

    _handleLeft() {
        this.selectedOption.toggle(-1);
    }

    _handleRight() {
        this.selectedOption.toggle(1);
    }

    get selectedOption(): OptionItem {
        return this.Options.children[this._optionsIndex] as OptionItem;
    }

    _getFocused() {
        return this.selectedOption;
    }

    historyState() {
        return {optionsIndex: this.selectedOption.index};
    }

}

type OptionItemOnChange = ((this: OptionItem, option: string) => void);

interface OptionItemTemplateSpec extends Lightning.Component.TemplateSpecStrong {
    index: number,
    label: string,
    options: string[],
    onChange: OptionItemOnChange,
    Label: {},
    SelectedOption: {
        Left: {},
        Option: {},
        Right: {}
    }
}

class OptionItem
    extends Lightning.Component<OptionItemTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<OptionItemTemplateSpec> {
    static _template(): Lightning.Component.Template<OptionItemTemplateSpec> {
        return {
            Label: {
                color: 0xff767676,
                text: {
                    fontSize: 36,
                    fontFace: "Regular",
                }
            },
            SelectedOption: {
                flex: {},
                x: 800, mountX: 1,
                Left: {
                    alpha: 0,
                    flexItem: {marginRight: 20, marginTop: 10},
                    src: Utils.asset("images/arrow.png"),
                    rotation: Math.PI
                },
                Option: {
                    text: {
                        fontSize: 36,
                        fontFace: "Regular"
                    }
                },
                Right: {
                    alpha: 0,
                    flexItem: {marginLeft: 20, marginTop: 10},
                    src: Utils.asset("images/arrow.png")
                }
            }
        };
    }

    Label = this.getByRef('Label')!;
    SelectedOption = this.getByRef('SelectedOption')!;
    Option = this.SelectedOption.getByRef('Option')!;

    private _index = 0;
    private _label = '';
    private _options: string[] = [];
    private _onChange: OptionItemOnChange | undefined;

    set label(v: string) {
        this._label = v;
        this.Label.text = v;
    }

    set index(v) {
        this._index = v;
    }

    get index() {
        return this._index;
    }

    set options(v: string[]) {
        this._options = v;
        this.Option.text = v[this._index] || 'Invalid Option';
    }

    set onChange(f: OptionItemOnChange){
        this._onChange = f;
    }

    update() {
        this.Option.text = this.selectedOption || 'Invalid Option';
    }

    toggle(direction: number) {
        this._index += direction;

        if (this._index < 0) {
            this._index = this._options.length - 1;
        } else if (this._index > this._options.length - 1) {
            this._index = 0;
        }

        if (this.selectedOption === undefined) return;

        this.Option.text = this.selectedOption;

        if(typeof this._onChange === "function"){
            this._onChange.call(this, this.selectedOption)
        }
    }

    _focus() {
        this.patch({
            SelectedOption: {
                Left: {
                    alpha: 1
                },
                Right: {
                    alpha: 1
                }
            }
        });
    }

    _unfocus() {
        this.patch({
            SelectedOption: {
                Left: {
                    alpha: 0
                },
                Right: {
                    alpha: 0
                }
            }
        });
    }

    get selectedOption(): string | undefined {
        return this._options[this._index];
    }

}
