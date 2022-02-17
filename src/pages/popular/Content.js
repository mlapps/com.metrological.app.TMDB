import {Lightning} from "@lightningjs/sdk";
import CircleProgressShader from "../../shader/CircleProgressShader";

export default class Content extends Lightning.Component {

    static _template() {
        return {
            flex: {direction: "column"},
            alpha: 0.001,
            Title: {},
            Details: {
                flex: {}, rtt: true,
                flexItem: {marginTop: -20},
                Rating: {
                    texture: Lightning.Tools.getRoundRect(100, 100, 50, 0, 0x00ffffff, true, 0xff081C22),
                    RatingNumber: {
                        mount: .5, x: w=>w / 2 + 2, y: h=>h / 2 + 4,
                        flex: {},
                        Number: {
                            text: {text: '0', fontSize: 38, fontFace: "SemiBold"}
                        },
                        Percentage: {
                            flexItem: {marginTop: 10},
                            text: {text: '%', fontSize: 12, fontFace: "SemiBold"}
                        }
                    },
                    RatingCircle: {
                        rect:true, color: 0x00ffffff, rtt:true, mount: .5, x: 51, y: 51, w: 90, h: 90, rotation: Math.PI * .5,
                        shader: {
                            type: CircleProgressShader, radius: 45, width: 5, angle: 0.0001, smooth: 0.01, color: 0xffd1215c, backgroundColor: 0xff204529
                        }
                    }
                },
                Metadata: {
                    flex: {direction: "column"},
                    flexItem: {marginLeft: 20},
                    Date: {
                        flexItem: {marginTop: 8},
                        text: {fontFace: "Regular", fontSize: 28, textColor: 0xff767676}
                    },
                    Genres: {
                        flexItem: {marginTop: 2},
                        text: {fontFace: "Regular", fontSize: 24, textColor: 0xff21d07a}
                    }
                }
            },
            ButtonHolder: {
                flexItem: {marginTop: 30},
                color: 0xff21d07a, rtt: true,
                texture: Lightning.Tools.getRoundRect(180, 60, 30, 0, 0xff21d07a, true, 0xffffffff),
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
            }
        };
    };

    _init() {
        this._voteAverage = 0;

        this._detailAnimation = this.animation({duration: 0.8, actions: [
            {t: '', p: 'alpha', rv: 0, v: {0: {v: 0}, 1: {v: 1}}},
            {t: '', p: 'x', rv: 90, v: {0: {v: 130}, 1: {v: 90}}},
        ]});

        this._ratingAnimation = this.animation({
            duration: 0.8, timingFunction: 'cubic-bezier(.94,.42,.49,.99)', actions:[
                {t: 'RatingCircle', p:'shader.angle', rv: 0.0001, v: (e) => {
                    return (this._voteAverage/10) * e;
                }},
                {t: 'Number', p:'text.text', rv: 0, v: (e) => {
                    return `${Math.floor((this._voteAverage*10) * e)}`;
                }}
            ]
        });

        this.tag("Title").on("txLoaded", ()=> {
            this._detailAnimation.start();
            this._ratingAnimation.start();
            this.application.emit("contentHeight", this.tag("Title").renderHeight + 200);
        });

        this.application.on("setItem", ({item})=> {
            clearTimeout(this._timeout);
            this._timeout = setTimeout(()=> {
                this._setDetails(item);
            }, 300);
        });
    }

    _setDetails(item) {
        this._voteAverage = item.voteAverage;
        this.alpha = 0.001;

        this._setupTitle(item);
        this._setThemeColor();

        const date = new Date(item.releaseDate || item.firstAirDate);
        this.tag("Date").text = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()} ${date.getFullYear()}`;

        let genres = "";
        item.genres.forEach((genre, index) => {
            if (index > 0) {
                genres += ` | ${genre.name}`
            } else {
                genres += `${genre.name}`
            }
        });
        this.tag("Genres").text = genres;
    }

    _setupTitle(item) {
        let fontSize = 128;
        if (item.title.length > 12 && item.title.length < 24) {
            fontSize = 108;
        } else if (item.title.length >= 24) {
            fontSize = 88;
        }

        this.tag("Title").patch({
            text: {fontFace: "Black", text: item.title, fontSize, lineHeight: fontSize+10, wordWrapWidth: 1000}
        });
    }

    _setThemeColor() {
        let color = 0xff21d07a;
        let backgroundColor = 0xff204529;

        if (this._voteAverage/10 < 0.5) {
            color = 0xffd1215c;
            backgroundColor = 0xff571435;
        } else if (this._voteAverage/10 >= 0.5 && this._voteAverage/10 <= 0.7) {
            color = 0xffd2d531;
            backgroundColor = 0xff423d0f;
        }

        this._themeColor = color;
        this.tag("ButtonHolder").color = color;
        this.tag("Genres").text.textColor = color;
        this.tag("RatingCircle").shader.color = color;
        this.tag("RatingCircle").shader.backgroundColor = backgroundColor;
    }

}