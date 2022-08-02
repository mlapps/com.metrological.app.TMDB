import { Lightning } from '@lightningjs/sdk';

interface MenuTemplateSpec<MenuIds extends string = string> extends Lightning.Component.TemplateSpecStrong {
    items: MenuItemData<MenuIds>[],
    lineOffset: number,
    Lines: {
        Top: {},
        Bottom: {}
    },
    Items: {}
}

export default class Menu<MenuIds extends string = string> extends Lightning.Component<MenuTemplateSpec<MenuIds>> implements Lightning.Component.ImplementTemplateSpec<MenuTemplateSpec<MenuIds>> {

    static override _template(): Lightning.Component.Template<MenuTemplateSpec> {
        return {
            Lines: {
                Top: {
                    x: -12, w: 2, rect: true, color: 0x50ffffff
                },
                Bottom: {
                    y: 790, mountY: 1, x: -12, w: 2, rect: true, color: 0x50ffffff
                }
            },
            Items: {},
        };
    }

    Lines = this.getByRef('Lines')!;
    Items = this.getByRef('Items')!;
    Lines_Top = this.Lines.getByRef('Top')!;
    Lines_Bottom = this.Lines.getByRef('Bottom')!;
    _id: string | null = null;
    _currentIndex: number = 0;
    _lineOffset = 0;

    override _init() {
        this.application.on("contentHeight", (h: number)=> {
            if (h === 0) {
                this.Lines_Top.setSmooth("h", 400, {duration: 0.3, timingFunction: 'cubic-bezier(.21,.5,.48,.93)'});
                this.Lines_Bottom.setSmooth("h", 390, {duration: 0.3, timingFunction: 'cubic-bezier(.21,.5,.48,.93)'});
            } else {
                this.Lines_Top.setSmooth("h", 440-this._lineOffset-(h/2)-(this._currentIndex*48), {duration: 0.3, timingFunction: 'cubic-bezier(.21,.5,.48,.93)'});
                this.Lines_Bottom.setSmooth("h", 330+this._lineOffset-(h/2)+(this._currentIndex*48), {duration: 0.3, timingFunction: 'cubic-bezier(.21,.5,.48,.93)'});
            }
        })
    }

    set items(v: MenuItemData<MenuIds>[]) {
        this.Items.children = v.map(({ label, itemId, selected })=>{
            return {
                type: MenuItem, label, itemId, selected
            }
        });
    }

    select(id: MenuIds, fastForward?: boolean) {
        if (id === this._id) return;

        this._id = id;
        let y = 0;

        (this.Items.children as MenuItem[]).forEach((item: MenuItem, index) => {
            item.setSmooth("y", y, {duration: fastForward?0:0.3});
            if (id === item.itemId) {
                this._currentIndex = index;
                this.Lines.setSmooth("y", (index+1)*48, {duration: fastForward?0:0.3, timingFunction: 'cubic-bezier(.21,.5,.48,.93)'});
                y += 810;
            }
            y += 48;
            item.selected = item.itemId === id;
        });

        this.Lines_Top.setSmooth("h", 400, {duration: 0.3, timingFunction: 'cubic-bezier(.94,.42,.49,.99)'});
        this.Lines_Bottom.setSmooth("h", 390, {duration: 0.3, timingFunction: 'cubic-bezier(.94,.42,.49,.99)'});
    }

    set lineOffset(v: number) {
        this._lineOffset = v;
    }

    show() {
        this.patch({
            smooth: {alpha: 1, x: 90}
        });
    }

    hide() {
        this.patch({
            smooth: {alpha: 0, x: 60}
        });
    }

}

interface MenuItemData<MenuIds extends string = string> {
    label: string,
    selected: boolean,
    itemId: MenuIds,
}

interface MenuItemTemplateSpec extends Lightning.Component.TemplateSpecStrong, MenuItemData {
    Label: {},
}

class MenuItem extends Lightning.Component<MenuItemTemplateSpec> implements Lightning.Component.ImplementTemplateSpec<MenuItemTemplateSpec> {
    static override _template(): Lightning.Component.Template<MenuItemTemplateSpec> {
        return {
            Label: {
                text: {fontSize: 28, fontFace: "Regular"}
            }
        };
    }

    Label = this.getByRef('Label')!;
    _label = '';
    _itemId = '';

    set label(v: string) {
        this._label = v;

        this.patch({
            Label: {
                text: {text: this._label}
            }
        });
    }

    set selected(v: boolean) {
        this.Label.color = v?0xffffffff:0xff767676;
    }

    set itemId(v: string) {
        this._itemId = v;
    }

    get itemId() {
        return this._itemId;
    }
}