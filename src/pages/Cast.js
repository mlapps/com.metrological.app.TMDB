import {Lightning, Router} from "@lightningjs/sdk";

export default class Cast extends Lightning.Component {

    static  _template() {
        return {
            Grid: {
                alpha: 0.001,
                x: 90, mountY: 0.5, y: 520, h: 451,
                transitions: {
                    x: {duration: 0.6, delay: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    alpha: {duration: 0.6, delay: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                }
            }
        };
    };

    _active() {
        this.widgets.detailsmenu.select("cast", true);
        this.application.emit("contentHeight", 640);
        this.tag("Grid").patch({
            smooth: {alpha: 1, x: 110}
        });
    }

    set content(v) {
        this.tag("Grid").childList.add(v);
    }

    set detailsType(v) {
        this._detailsType = v;
    }

    set detailsId(v) {
        this._detailsId = v;
    }

    _handleUp() {
        this.widgets.detailsmenu.select("details");
        Router.navigate(`details/${this._detailsType}/${this._detailsId}`, true);
    }

    _getFocused() {
        return this.tag("Grid").children[0];
    }

}