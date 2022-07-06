import {Lightning, Router} from '@lightningjs/sdk';
import type { FlipList, List } from '../../components';
import Content from "./Content";

interface PopularItem {
    type: string,
    id: string
}

type Listeners = {
    contentHidden: () => void;
    [s: string]: (...args: any[]) => void;
};

interface PopularTemplateSpec extends Lightning.Component.TemplateSpecStrong {
    Content: typeof Content;
    List: {}
}

export default class Popular extends Lightning.Component<PopularTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<PopularTemplateSpec> {

    Content = this.getByRef('Content')!;
    List = this.getByRef('List')!;

    _index = 0;
    _item: PopularItem | undefined;
    listeners: Listeners = {
        contentHidden: ()=> {
            if (!this._item) return;
            this.widgets.menu.hide(); // Lightning SDK Page
            Router.navigate(`details/${this._item.type}/${this._item.id}`, true);
        }
    }

    static _template() {
        return {
            Content: {
                mountY: 0.5, y: 540, x: 90,
                type: Content
            },
            List: {}
        };
    }

    _attach() {
        ["contentHidden", "readyForNavigate"].forEach((event)=>{
            this.application.on(event, this.listeners[event]!)
        });
    }

    _detach() {
        ["contentHidden", "readyForNavigate"].forEach((event)=>{
            this.application.off(event, this.listeners[event]!)
        });
    }

    _active() {
        this.widgets.menu.show();
    }

    set content(v: List | FlipList) {
        if (v) {
            this.List.childList.add(v);
        }
    }

    $firstItemCreated() {
        this._refocus();
    }

    _getFocused() {
        return this.selectedList;
    }

    get selectedList(): List | FlipList {
        return this.List.children[this._index];
    }

    $selectItem({item}: { item: PopularItem }) {
        this._item = item;
        Router.navigate(`details/${this._item.type}/${this._item.id}`, true);
    }

    historyState(params) {
        if (params) {
            this.selectedList.index = params.listIndex;
            this.selectedList.resetConfigIndex();
        } else {
            const list: FlipList | undefined = this.List.children[this._index];
            if (list) {
                return {listIndex: this.List.children[this._index]!.index}
            }
        }
    }

}