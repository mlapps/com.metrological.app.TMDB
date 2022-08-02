import {Img, Lightning, Utils} from "@lightningjs/sdk";
import { DetailsModel, MovieModel, TvModel } from "../lib/models";
import {getImgUrl} from "../lib/tools";

export interface BackgroundTemplateSpec extends Lightning.Component.TemplateSpecStrong {
    Backgrounds: {
        BackgroundA: {},
        BackgroundB: {}
    }
}

export default class Background
    extends Lightning.Component<BackgroundTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<BackgroundTemplateSpec> {

    Backgrounds = this.getByRef('Backgrounds')!;
    BackgroundA = this.Backgrounds.getByRef('BackgroundA')!;
    BackgroundB = this.Backgrounds.getByRef('BackgroundB')!;
    listeners: Pick<Lightning.Application.EventMap, 'setBackground' | 'readyForBackground' | 'setItem'> = {
        setBackground: ({src})=> {
            this._item = null;
            this._skip = false;
            this._src = src;
        },
        readyForBackground: ()=> {
            if (!this._skip) {
                this._setBackground(this._src);
            }
        },
        setItem: ({item})=> {
            if (this._item && item.background === this._item.background) {
                this._skip = true;
                return;
            }
            this._skip = false;
            this._item = item;

            let src = Utils.asset("images/background.png");
            if (this._item.background) {
                src = getImgUrl(this._item.background, 1280);
            }

            this._src = src;
        }
    };
    private _index = 0;
    private _src = '';
    private _lastSrc = '';
    private _item: DetailsModel | TvModel | MovieModel | null = null;
    private _skip: boolean = false;

    static override _template(): Lightning.Component.Template<BackgroundTemplateSpec> {
        return {
            Backgrounds: {
                w: 1920, h: 1080,
                BackgroundA: {
                    colorLeft: 0x50ffffff, colorRight: 0x0090cea1
                },
                BackgroundB: {
                    colorLeft: 0x40ffffff, colorRight: 0x0090cea1
                }
            }
        };
    };

    override _init() {
        this.BackgroundA.on("txLoaded", ()=> {
            this.BackgroundA.setSmooth("alpha", 1, {duration: 0.6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'});
            this.BackgroundB.setSmooth("alpha", 0, {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'});
        });

        this.BackgroundB.on("txLoaded", ()=> {
            this.BackgroundB.setSmooth("alpha", 1, {duration: 0.6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'});
            this.BackgroundA.setSmooth("alpha", 0, {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'});
        });

        this.BackgroundA.transition("alpha").on("finish", ()=> {
            if (this._index === 0) {
                this.application.emit("backgroundLoaded");
            }
        });

        this.BackgroundB.transition("alpha").on("finish", ()=> {
            if (this._index === 1) {
                this.application.emit("backgroundLoaded");
            }
        });
    }

    override _attach() {
        this.application.on('setBackground', this.listeners['setBackground']);
        this.application.on('setItem', this.listeners['setItem']);
        this.application.on('readyForBackground', this.listeners['readyForBackground']);
    }

    override _detach() {
        this.application.off('setBackground', this.listeners['setBackground']);
        this.application.off('setItem', this.listeners['setItem']);
        this.application.off('readyForBackground', this.listeners['readyForBackground']);
    }

    _setBackground(src: string) {
        if (src === this._lastSrc) return;
        this._lastSrc = src;

        this.Backgrounds.children[this._index]!.patch({
            texture: Img(src).contain(1920, 1080),
            alpha: 0.001
        });
        this._index ^= 1;
    }
}