import {Lightning, Router} from '@lightningjs/sdk';

export default class Main extends Lightning.Component{

    static _template() {
        return {
            Lists: {
                x: 100, y: 560, zIndex: 3
            }
        };
    }

    _init() {
        this._index = 0;
    }

    _active() {
        this.widgets.menu.visible = true;
    }

    set main(v) {
        this.tag("Lists").children = v;

        let y = 0;
        this.tag("Lists").children.forEach(child => {
            child.y = y;
            y += child.constructor.height;
        });
    }

    _focus() {
        this.patch({
            Lists: {
                smooth: {y: [560, {duration: .2, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}]}
            }
        });
    }

    _unfocus() {
        this.patch({
            Lists: {
                smooth: {y: [600, {duration: .4, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}]}
            }
        });
    }

    _handleUp() {
        Router.focusWidget("menu");
    }

    $firstItemCreated() {
        this._refocus();
    }

    _getFocused() {
        return this.tag("Lists").children[this._index];
    }

}