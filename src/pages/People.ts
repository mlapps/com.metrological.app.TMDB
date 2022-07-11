import {Lightning, Router, Utils} from "@lightningjs/sdk";
import {Title} from "../components";
import { People as PeopleModel } from "../lib/models";
import {getImgUrl} from "../lib/tools";

export interface PeopleTemplateSpec extends Lightning.Component.TemplateSpecStrong {
    content: PeopleModel
    Item: {
        Title: typeof Title,
        Birth: {},
        Holder: {
            Biography: {}
        }
    }
}

export default class People
    extends Lightning.Component<PeopleTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<PeopleTemplateSpec> {

    Item = this.getByRef('Item')!;
    Title = this.Item.getByRef('Title')!;
    Birth = this.Item.getByRef('Birth')!;
    Holder = this.Item.getByRef('Holder')!;
    Biography = this.Holder.getByRef('Biography')!

    private _item!: PeopleModel;

    static _template(): Lightning.Component.Template<PeopleTemplateSpec> {
        return {
            Item: {
                flex: {direction: "column"},
                x: 90,
                mountY: 0.5, y: 514,
                transitions: {
                    alpha: {duration: 0.3, delay: 0.1, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    mountY: {duration: 0.3, delay: 0.1, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    y: {duration: 0.3, delay: 0.1, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    x: {duration: 0.6, delay: 0.4, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                },
                Title: {
                    type: Title,
                    skip: true
                },
                Birth: {
                    text: {fontFace: "Regular", fontSize: 24, textColor: 0xff21d07a}
                },
                Holder: {
                    flex: {direction: "column"},
                    flexItem: {marginTop: 40},
                    alpha: 0,
                    transitions: {
                        alpha: {duration: 0.6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                        y: {duration: 0.6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                    },
                    Biography: {
                        text: {fontFace: "Regular", fontSize: 24, lineHeight: 44, wordWrapWidth: 1480, textColor: 0xffc3c3c3}
                    }
                }
            }
        };
    };

    _init() {
        this.Item.transition("y").on("finish", ()=> {
            this.Holder.y = 30;
            this.Holder.patch({
                smooth: {
                    alpha: 1, y: 0
                }
            });
        });
    }

    _active() {
        this.application.emit("contentHeight", 0);

        this.patch({
            Item: {
                smooth: {y: 110, x: 110, mountY: 0}
            }
        });

        this.Item.transition("y").on("finish", ()=> {
            this.application.emit("readyForBackground");
        });

        this.widgets.peoplemenu.select("details", true);
    }

    _inactive() {
        this.patch({
            Item: {
                smooth: {y: 514, x: 90, mountY: 0.5}
            }
        });
    }

    set content(v: PeopleModel) {
        this._item = v;
        this.Title.label = this._item.name;
        this.Birth.text = `${this._item.birthday} | ${this._item.placeOfBirth}`;

        if (this._item._biography.length >= 600) {
            this.Biography.text = this._truncateString(this._item._biography, 700);
        } else {
            this.Biography.text = this._item._biography;
        }

        let src = Utils.asset("images/background.png");
        if (this._item.profilePath) {
            src = getImgUrl(this._item.profilePath, 780);
        }
        this.application.emit("setBackground", {src});
    }

    _handleDown() {
        this.widgets.peoplemenu.select("moviecredits");
        Router.navigate(`movie_credits/movie/${this._item.id}`, true);
    }

    _truncateString(s: string, n: number) {
        let cut= s.indexOf(' ', n);
        if(cut === -1) return s;
        return `${s.substring(0, cut)}...`
    }

}