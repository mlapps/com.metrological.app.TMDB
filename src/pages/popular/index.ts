import {Lightning, Router} from '@lightningjs/sdk';
import Content from "./Content";

interface ListBaseConstructor {
    new (...args: any[]): Lightning.Component & {
        index: number;
        resetConfigIndex(): void;
    };
    get height(): number;
}

interface PopularItem {
    type: string,
    id: string
}

interface PopularTemplateSpec extends Lightning.Component.TemplateSpecStrong {
    Content: typeof Content;
    List: {}
}
interface PopularTypeConfig extends Lightning.Component.TypeConfig {
    IsPage: true;
    HistoryStateType: {
        listIndex: number;
    }
}

export default class Popular
    extends Lightning.Component<PopularTemplateSpec, PopularTypeConfig>
    implements Lightning.Component.ImplementTemplateSpec<PopularTemplateSpec> {

    Content = this.getByRef('Content')!;
    List = this.getByRef('List')!;

    _index = 0;
    _item: PopularItem | undefined;
    listeners = {
        contentHidden: () => {
            if (!this._item) return;
            this.widgets.menu.hide(); // Lightning SDK Page
            Router.navigate(`details/${this._item.type}/${this._item.id}`, true);
        }
    }

    static override _template() {
        return {
            Content: {
                mountY: 0.5, y: 540, x: 90,
                type: Content
            },
            List: {}
        };
    }

    override _attach() {
        this.application.on('contentHidden', this.listeners['contentHidden']);
        // !!! Bug caught by typing, readyForNavigate is not an emitted event
        // this.application.on('readyForNavigate', this.listeners['readyForNavigate']);
    }

    override _detach() {
        this.application.off('contentHidden', this.listeners['contentHidden']);
        // !!! Bug caught by typing, readyForNavigate is not an emitted event
        // this.application.off('readyForNavigate', this.listeners['readyForNavigate']);
    }

    override _active() {
        this.widgets.menu.show();
    }

    set content(v: InstanceType<ListBaseConstructor>) {
        if (v) {
            this.List.childList.add(v);
        }
    }

    $firstItemCreated() {
        this._refocus();
    }

    override _getFocused() {
        return this.selectedList;
    }

    get selectedList(): InstanceType<ListBaseConstructor> {
        return this.List.children[this._index] as InstanceType<ListBaseConstructor>;
    }

    $selectItem({item}: { item: PopularItem }) {
        this._item = item;
        Router.navigate(`details/${this._item.type}/${this._item.id}`, true);
    }

    override historyState(params: Router.HistoryState<PopularTypeConfig>): Router.HistoryState<PopularTypeConfig> {
        if (params) {
            this.selectedList.index = params.listIndex;
            this.selectedList.resetConfigIndex();
        } else {
            const list: InstanceType<ListBaseConstructor> | undefined = this.List.children[this._index] as InstanceType<ListBaseConstructor> | undefined;
            if (list) {
                return {listIndex: list.index}
            }
        }
    }
}