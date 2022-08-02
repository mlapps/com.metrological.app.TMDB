import {Img, Lightning, Router, Utils} from "@lightningjs/sdk";
import { CastPersonData } from "../../lib/models/CastModel";
import {getImgUrl} from "../../lib/tools";

interface ActorTemplateSpec extends Lightning.Component.TemplateSpecStrong {
    item: CastPersonData;
    Actor: {
        Image: {}
    },
    ActorInfo: {
        Name: {},
        Character: {}
    }
}

export default class Actor
    extends Lightning.Component<ActorTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<ActorTemplateSpec>
{
    Actor = this.getByRef('Actor')!;
    ActorInfo = this.getByRef('ActorInfo')!;
    Image = this.Actor.getByRef('Image')!;
    Name = this.ActorInfo.getByRef('Name')!;
    Character = this.ActorInfo.getByRef('Character')!;
    private _item: CastPersonData | undefined;

    static override _template(): Lightning.Component.Template<ActorTemplateSpec> {
        return {
            Actor: {
                w: Actor.width, h: Actor.height, rtt: true, mount: 0.5, x: Actor.width/2, y: Actor.height/2,
                scale: 0.98,
                shader: {type: Lightning.shaders.RoundedRectangle, radius: 18},
                transitions: {
                    scale: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                },
                Image: {
                    w: 300, h: 451,
                    mount: 0.5, x: Actor.width/2, y: Actor.height/2,
                    shader: {type: Lightning.shaders.Grayscale, amount: 1},
                    transitions: {
                        color: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                    }
                }
            },
            ActorInfo: {
                flex: {direction: "column"},
                y: Actor.height + 6,
                transitions: {
                    y: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                },
                Name: {
                    x: Actor.width/2, mountX: 0.5,
                    text: {fontFace: "Bold", fontSize: 24, wordWrapWidth: Actor.width, textAlign: "center", textColor: 0xffc3c3c3}
                },
                Character: {
                    x: Actor.width/2, mountX: 0.5,
                    text: {fontFace: "Regular", fontSize: 21, textAlign: "center", textColor: 0xff9f9f9f, wordWrapWidth: Actor.width, lineHeight: 31, maxLines: 2}
                }
            }
        };
    }

    set item(v: CastPersonData) {
        this._item = v;

        if (this._item.profile_path) {
            const image = getImgUrl(this._item.profile_path, 300)
            this.Image.texture = Img(image).landscape(Actor.width);
        } else {
            this.Image.src = Utils.asset("images/placeholder.png");
        }

        this.Name.text = this._item.name || 'Unknown';
        this.Character.text = this._item.character || 'Unknown';
    }

    override _focus() {
        this.patch({
            Actor: {
                smooth: {scale: 1},
                Image: {
                    smooth: {
                        ["shader.amount" as any]: 0
                    }
                }
            },
            ActorInfo: {
                smooth: {y: Actor.height + 16},
                Name: {
                    smooth: {
                        ["text.textColor" as any]: 0xffffffff
                    }
                },
                Character: {
                    smooth: {
                        ["text.textColor" as any]: 0xffc3c3c3,
                    }
                }
            }
        });
    }

    override _unfocus() {
        this.patch({
            Actor: {
                smooth: {scale: 0.98},
                Image: {
                    smooth: {
                        ["shader.amount" as any]: 1
                    }
                }
            },
            ActorInfo: {
                smooth: {y: Actor.height + 6},
                Name: {
                    smooth: {
                        ["text.textColor" as any]: 0xffc3c3c3,
                    }
                },
                Character: {
                    smooth: {
                        ["text.textColor" as any]: 0xff9f9f9f
                    }
                }
            }
        });
    }

    override _handleEnter() {
        if (!this._item) return;
        Router.navigate(`people/${this._item.id}`, true);
    }

    static get width() {
        return 300;
    }

    static get height(){
        return 451;
    }

    static get offset() {
        return 40;
    }

}