import {Img, Lightning, Utils} from "@lightningjs/sdk";
import { MovieModel, TvModel } from "../../lib/models";
import {getImgUrl} from "../../lib/tools";
import PerspectiveShader from "../../shader/PerspectiveShader";
import {ITEM_CONFIGS} from "./ItemConfigs";
import ItemWrapper from "./ItemWrapper";

interface ItemTemplateSpec extends Lightning.Component.TemplateSpecStrong {
    focusedItem: boolean;
    item?: MovieModel | TvModel;
    index: number;
    Blur: typeof Lightning.components.FastBlurComponent<Lightning.Element<{
        Perspective: {
            Poster: {
                Image: {},
                Border: {}
            }
        }
    } & Lightning.Element.TemplateSpecStrong>>
}

export default class Item
    extends Lightning.Component<ItemTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<ItemTemplateSpec> {

    Blur = this.getByRef('Blur')!;
    Content = this.Blur.content;
    Poster = this.Content.getByRef('Perspective')!.getByRef('Poster')!;
    Image = this.Poster?.getByRef('Image')!;

    private _perspectiveAnimation: Lightning.types.Animation | undefined;
    private _focusedItem: boolean = false;
    private _index: number = 0;
    private _item: MovieModel | TvModel | undefined;

    static override _template(): Lightning.Component.Template<ItemTemplateSpec> {
        return {
            w: Item.width, h: Item.height, alpha: 0,
            transitions: {
                alpha: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
            },
            Blur: {
                w: Item.width, h: Item.height, rtt: true,
                type: Lightning.components.FastBlurComponent, amount: 0,
                transitions: {
                    amount: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    zIndex: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    x: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    y: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                },
                content: {
                    Perspective: {
                        w: Item.width, h: Item.height, rtt: true,
                        shader: {type: PerspectiveShader, rx: 0, ry: 0},
                        Poster: {
                            w: Item.width, h: Item.height, rtt: true, alpha: 0.001,
                            transitions: {
                                scale: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                            },
                            shader: {type: Lightning.shaders.RoundedRectangle, radius: 18},
                            Image: {
                                w: w=>w, h: h=>h,
                                transitions: {
                                    alpha: {duration: 0.3}
                                }
                            },
                            Border: {
                                x: -4, y: -4,
                                colorBottom: 0xff121212, colorTop: 0xff434343,
                                texture: Lightning.Tools.getRoundRect(Item.width,Item.height,18,3,0xffffffff,false,0xffffffff)
                            }
                        }
                    }
                }
            }
        };
    }

    override _init() {
        this._perspectiveAnimation = this.Blur.content.animation({
            // !!! Timing function not available on animation()
            duration: 0.3, /* timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)', */ actions:[
                {t: 'Perspective', p: 'shader.rx' as '$$number', v: (e)=> {
                    const {rx} = ITEM_CONFIGS[this.configIndex]!;
                    return e * (rx.e-rx.s)+rx.s;
                }}
            ]
        });

        this.Blur.transition("zIndex").on("finish", ()=> {
            if (this._focusedItem) {
                this.application.emit("itemAnimationEnded");
            }
        });

        this.Image.on("txLoaded", ()=> {
            this.Poster.alpha = 1;
        });

        this.Image.on("txUnloaded", ()=> {
            this.Poster.alpha = 0.001;
        });

        this._resetPosition();
    }

    set focusedItem(v: boolean) {
        this._focusedItem = v;
    }

    set item(v: MovieModel | TvModel | undefined) {
        this._item = v;

        if (this._item && this._item.poster) {
            const image = getImgUrl(this._item.poster, 500);
            this.Image.texture = Img(image).contain(342, 513);
        } else {
            this.Image.src = Utils.asset("images/placeholder.png");
        }
    }

    get item(): MovieModel | TvModel | undefined {
        return this._item;
    }

    set index(v: number) {
        this._index = v;
    }

    get configIndex() {
        return (this.parent as ItemWrapper<typeof Item>).configIndex;
    }

    animatePosition() {
        const config = ITEM_CONFIGS[this.configIndex];
        if (!config) return;
        const {alpha, scale, x, y, color, amount, zIndex} = config;

        this.patch({
            alpha,
            Blur: {
                amount,
                smooth: {zIndex, x, y},
                content: {
                    Perspective: {
                        Poster: {
                            smooth: {scale},
                            Image: {
                                color
                            }
                        }
                    }
                }
            }
        });

        this._perspectiveAnimation?.start();
    }

    _resetPosition() {
        const config = ITEM_CONFIGS[this.configIndex];
        if (!config) return;
        const {alpha, scale, x, y, color, amount, zIndex, rx} = config;
        this.patch({
            alpha,
            Blur: {
                amount, zIndex, x, y,
                content: {
                    Perspective: {
                        shader: {type: PerspectiveShader, rx: rx.e, ry: 0.05},
                        Poster: {
                            scale,
                            Image: {
                                color
                            }
                        }
                    }
                }
            }
        });
        this.application.emit("itemAnimationEnded");
    }

    override _handleEnter() {
        if (!this._item) return;
        this.fireAncestors("$selectItem", {item: this._item});
    }

    static get width() {
        return 342;
    }

    static get height(){
        return 513;
    }

    static get offset() {
        return 0;
    }

}