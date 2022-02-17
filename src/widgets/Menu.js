import {Lightning} from '@lightningjs/sdk';

export default class Menu extends Lightning.Component {

    static _template() {
        return {
            Lines: {
                Top: {
                    x: -12, w: 2, rect: true, color: 0x50ffffff
                },
                Bottom: {
                    y: 790, mountY: 1, x: -12, w: 2, rect: true, color: 0x50ffffff
                }
            },
            Items: {
                Movies: {
                    type: MenuItem,
                    label: "Movies", id: "movie", selected: true
                },
                Tv: {
                    type: MenuItem,
                    label: "TV", id: "tv", selected: false
                },
                Search: {
                    type: MenuItem,
                    label: "Search", id: "search", selected: false
                }
            }
        };
    }

    _init() {
        this._id = null;
        this.application.on("contentHeight", (h)=> {
            this.tag("Top").setSmooth("h", 420-(h/2)-(this._currentIndex*48), {duration: 0.3, timingFunction: 'cubic-bezier(.21,.5,.48,.93)'});
            this.tag("Bottom").setSmooth("h", 330-(h/2)+(this._currentIndex*48), {duration: 0.3, timingFunction: 'cubic-bezier(.21,.5,.48,.93)'});
        })
    }

    select(id, fastForward) {
        if (id === this._id) return;

        this._id = id;
        let y = 0;

        this.tag("Items").children.forEach((item, index) => {
            item.setSmooth("y", y, {duration: fastForward?0:0.3});
            if (id === item.id) {
                this._currentIndex = index;
                this.tag("Lines").setSmooth("y", (index+1)*48, {duration: fastForward?0:0.3, timingFunction: 'cubic-bezier(.21,.5,.48,.93)'});
                y += 810;
            }
            y += 48;
            item.selected = item.id === id;
        });

        this.tag("Top").setSmooth("h", 400, {duration: 0.3, timingFunction: 'cubic-bezier(.94,.42,.49,.99)'});
        this.tag("Bottom").setSmooth("h", 390, {duration: 0.3, timingFunction: 'cubic-bezier(.94,.42,.49,.99)'});
    }

}

class MenuItem extends Lightning.Component {
    static _template() {
        return {
            Label: {
                text: {fontSize: 28, fontFace: "Regular"}
            }
        };
    }

    set label(v) {
        this._label = v;

        this.patch({
            Label: {
                text: {text: this._label}
            }
        });
    }

    set selected(v) {
        this.tag("Label").color = v?0xffffffff:0xff767676;
    }

    set id(v) {
        this._id = v;
    }

    get id() {
        return this._id;
    }
}