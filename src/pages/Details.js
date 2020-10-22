import {Img, Lightning, Router} from '@lightningjs/sdk';
import {getImgUrl} from "../lib/tools";
import Button from "../components/Button";

export default class Details extends Lightning.Component{

    static _template() {
        return {
            x: 68, y: 300,
            flex: {direction: "column"},
            Header: {
                flex: {},
                Poster: {
                    flexItem: {marginRight: 40},
                    w: 300, h: 450,
                    shader: {type: Lightning.shaders.RoundedRectangle, radius: 16},
                    Image: {
                        w: w=>w, h: h=>h
                    }
                },
                Details: {
                    flex: {direction: "column"},
                    x: 90,
                    transitions: {
                        x: {duration: 1, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                    },
                    Year: {
                        text: {fontSize: 32, fontFace: "SourceSansPro-Regular"}
                    },
                    Title: {
                        text: {fontSize: 64, fontFace: "SourceSansPro-Bold", wordWrapWidth: 600, maxLines: 2, lineHeight: 74}
                    },
                    Overview: {
                        color: 0xff7b7b7b, text: {fontSize: 24, fontFace: "SourceSansPro-Regular", wordWrapWidth: 960, lineHeight: 38}
                    },
                    Button: {
                        flexItem: {marginTop: 30},
                        type: Button, label: "Watch Trailer"
                    }
                }
            }
        };
    }

    _active() {
        this.widgets.menu.visible = true;
        this.application.emit("setItem", this._details);

        this.patch({
            Header: {
                Details: {
                    smooth: {x: 40}
                }
            }
        });

        this._refocus();
    }

    _inactive() {
        this.tag("Details").setSmooth("x", 90);
    }

    set details(v) {
        this._details = v;
        const image = getImgUrl(this._details.poster, 500);

        this.patch({
            Header: {
                Poster: {
                    Image: {
                        texture: Img(image).contain(300, 450)
                    }
                },
                Details: {
                    Year: {
                        text: {text: this._details.releaseDate.getFullYear()}
                    },
                    Title: {
                        text: {text: this._details.title}
                    },
                    Overview: {
                        text: {text: this._details.overview}
                    }
                }
            }
        });
    }

    _handleUp() {
        Router.focusWidget("menu");
    }

    _getFocused() {
        return this.tag("Button");
    }

}