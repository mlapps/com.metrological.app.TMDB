import {Lightning, Router, Utils} from "@lightningjs/sdk";

export interface CastTemplateSpec extends Lightning.Component.TemplateSpec {
    content: Lightning.Component;
    detailsType: 'tv' | 'movie';
    detailsId: string;
    List: object
}

interface CastTypeConfig extends Lightning.Component.TypeConfig {
    IsPage: true;
}

export default class Cast
    extends Lightning.Component<CastTemplateSpec, CastTypeConfig>
    implements Lightning.Component.ImplementTemplateSpec<CastTemplateSpec> {

    List = this.getByRef('List')!;
    private _detailsType: string = '';
    private _detailsId: string = '';

    static override _template(): Lightning.Component.Template<CastTemplateSpec> {
        return {
            List: {
                alpha: 0.001,
                x: 110, mountY: 0.5, y: 520, h: 451,
                transitions: {
                    x: {duration: 0.6, delay: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    alpha: {duration: 0.6, delay: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                }
            }
        };
    };

    override _active() {
        this.widgets.detailsmenu.select("cast", true);

        const src = Utils.asset("images/background.png");
        this.application.emit("setBackground", {src});
        this.application.emit("contentHeight", 640);

        this.List.transition("alpha").on("finish", ()=> {
            this.application.emit("readyForBackground");
        });

        this.List.patch({
            smooth: {alpha: 1, x: 90}
        });
    }

    set content(v: Lightning.Component) {
        if (v) {
            this.List.childList.add(v);
        }
    }

    set detailsType(v: 'tv' | 'movie') {
        this._detailsType = v;
    }

    set detailsId(v: string) {
        this._detailsId = v;
    }

    override _handleUp() {
        Router.navigate(`details/${this._detailsType}/${this._detailsId}`, true);
        this.widgets.detailsmenu.select("details");
    }

    override _handleDown() {
        Router.navigate(`similar/${this._detailsType}/${this._detailsId}`, true);
        this.widgets.detailsmenu.select("similar");
    }

    override _getFocused() {
        return this.List.children[0] as Lightning.Component;
    }

}