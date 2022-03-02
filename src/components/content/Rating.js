import {Lightning} from "@lightningjs/sdk";
import CircleProgressShader from "../../shader/CircleProgressShader";

export default class Rating extends Lightning.Component {

    static _template() {
        return {
            texture: Lightning.Tools.getRoundRect(100, 100, 50, 0, 0x00ffffff, true, 0xff081C22),
            rtt: true,
            RatingNumber: {
                mount: .5, x: w=>w / 2 - 2, y: h=>h / 2 + 4,
                Number: {
                    text: {text: '0', fontSize: 34, fontFace: "SemiBold"}
                },
                Percentage: {
                    y: 6,
                    text: {text: '%', fontSize: 12, fontFace: "SemiBold"}
                }
            },
            RatingCircle: {
                rect: true, rtt: true, color: 0x00ffffff, mount: .5, x: 51, y: 51, w: 90, h: 90, rotation: Math.PI * .5,
                shader: {
                    type: CircleProgressShader, radius: 45, width: 5, angle: 0, smooth: 0.007, color: 0xffd1215c, backgroundColor: 0xff204529
                }
            }
        };
    };

    _init() {
        this._voteAverage = 0;

        this.tag("Number").on("txLoaded", ()=> {
            this.tag("RatingNumber").w = this.tag("Number").renderWidth;
            this.tag("RatingNumber").h = this.tag("Number").renderHeight;
            this.tag("Percentage").x = this.tag("Number").renderWidth;
        });

        this._ratingAnimation = this.animation({
            duration: 0.6, timingFunction: 'cubic-bezier(.94,.42,.49,.99)', actions:[
                {t: 'RatingCircle', p:'shader.angle', rv: 0.0001, v: (e) => {
                    return (this._voteAverage/10) * e;
                }},
                {t: 'Number', p:'text.text', rv: 0, v: (e) => {
                    return `${Math.floor((this._voteAverage*10) * e)}`;
                }}
            ]
        });
    }

    set voteAverage(v) {
        this._voteAverage = v;
        this._ratingColor();
    }

    startAnimation(skipAnimation) {
        if (skipAnimation || this._voteAverage === 0) {
            this.tag("RatingCircle").shader.angle = (this._voteAverage/10);
            this.tag("Number").text = `${this._voteAverage===0?`-`:Math.floor(this._voteAverage*10)}`;
            this.tag("Percentage").visible = this._voteAverage !== 0;
        } else {
            this._ratingAnimation.start();
        }
    }

    _ratingColor() {
        let color = 0xff21d07a;
        let backgroundColor = 0xff204529;

        if (this._voteAverage === 0) {
            color = 0xff21d07a;
            backgroundColor = 0xff204529;
        } else if (this._voteAverage/10 < 0.4) {
            color = 0xffd1215c;
            backgroundColor = 0xff571435;
        } else if (this._voteAverage/10 >= 0.4 && this._voteAverage/10 < 0.7) {
            color = 0xffd2d531;
            backgroundColor = 0xff423d0f;
        }

        this.tag("RatingCircle").shader.color = color;
        this.tag("RatingCircle").shader.backgroundColor = backgroundColor;
        this.application.emit("ratingColor", color)
    }

}