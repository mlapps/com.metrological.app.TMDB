import {Lightning} from "@lightningjs/sdk";
import CircleProgressShader from "../../shader/CircleProgressShader";

interface RatingTemplateSpec extends Lightning.Component.TemplateSpecStrong {
    voteAverage: number;
    RatingNumber: {
        Number: {};
        Percentage: {};
    };
    RatingCircle: {}
}

export default class Rating
    extends Lightning.Component<RatingTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<RatingTemplateSpec> {

    RatingNumber = this.getByRef('RatingNumber')!;
    RatingCircle = this.getByRef('RatingCircle')!;
    Number = this.RatingNumber.getByRef('Number')!;
    Percentage = this.RatingNumber.getByRef('Percentage')!;

    private _voteAverage = 0;
    // !!! Below `timingFunction` is not supported by Animations, if I understand everything correctly
    // This had already existed before I moved this code
    private _ratingAnimation: Lightning.types.Animation = this.animation({
        duration: 0.6, /* timingFunction: 'cubic-bezier(.94,.42,.49,.99)', */ actions:[
            {t: 'RatingCircle', p: 'shader.angle', rv: 0.0001, v: (e) => {
                return (this._voteAverage/10) * e;
            }},
            {t: 'Number', p: 'text.text', rv: 0, v: (e) => {
                return `${Math.floor((this._voteAverage*10) * e)}`;
            }}
        ]
    });

    static override _template(): Lightning.Component.Template<RatingTemplateSpec> {
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

    override _init() {
        this.Number.on('txLoaded', ()=> {
            this.RatingNumber.w = this.Number.renderWidth;
            this.RatingNumber.h = this.Number.renderHeight;
            this.Percentage.x = this.Number.renderWidth;
        });
    }

    set voteAverage(v: number) {
        this._voteAverage = v;
        this._ratingColor();
    }

    startAnimation(skipAnimation?: boolean) {
        if (skipAnimation || this._voteAverage === 0) {
            this.RatingCircle.shader!.angle = (this._voteAverage/10);
            this.Number.text = `${this._voteAverage===0?`-`:Math.floor(this._voteAverage*10)}`;
            this.Percentage.visible = this._voteAverage !== 0;
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

        this.RatingCircle.shader!.color = color;
        this.RatingCircle.shader!.backgroundColor = backgroundColor;
        this.application.emit("ratingColor", color)
    }

}