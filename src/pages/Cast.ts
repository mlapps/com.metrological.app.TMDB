import {Lightning, Router, Utils} from "@lightningjs/sdk";

export interface CastTemplateSpec extends Lightning.Component.TemplateSpecStrong {
    content: any;
    detailsType: string;
    detailsId: any;
    List: {}
}

export default class Cast
    extends Lightning.Component<CastTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<CastTemplateSpec> {

    List = this.getByRef('List')!;
    private _detailsType: string = '';
    private _detailsId: string = '';

    static  _template(): Lightning.Component.Template<CastTemplateSpec> {
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

    _active() {
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

    set detailsType(v: string) {
        this._detailsType = v;
    }

    set detailsId(v: string) {
        this._detailsId = v;
    }

    _handleUp() {
        Router.navigate(`details/${this._detailsType}/${this._detailsId}`, true);
        this.widgets.detailsmenu.select("details");
    }

    _handleDown() {
        Router.navigate(`similar/${this._detailsType}/${this._detailsId}`, true);
        this.widgets.detailsmenu.select("similar");
    }

    _getFocused() {
        return this.List.children[0] as Lightning.Component;
    }

}