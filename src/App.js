import { Utils, Router } from '@lightningjs/sdk';
import routes from "./lib/routes";
import {init as initApi} from "./lib/api"
import {Menu} from "./widgets"
import Background from "./Background";

export default class App extends Router.App {
    static getFonts() {
        return [
            {family: 'SourceSansPro-Regular', url: Utils.asset('fonts/SourceSansPro-Regular.ttf'), descriptors: {}},
            {family: 'SourceSansPro-Black', url: Utils.asset('fonts/SourceSansPro-Black.ttf'), descriptors: {}},
            {family: 'SourceSansPro-Bold', url: Utils.asset('fonts/SourceSansPro-Bold.ttf'), descriptors: {}}
        ];
    }

    // when App instance is initialized we call the routes
    // this will setup all pages and attach them to there route
    _setup() {
        initApi(this.stage);
        Router.startRouter(routes, this);
    }

    static _template() {
        return {
            Background: {
                type: Background
            },
            // we MUST spread the base-class template
            // if we want to provide Widgets.
            ...super._template(),
            Widgets: {
                Menu:{
                    type: Menu, x: 68, y: 68, zIndex: 99, visible: false
                }
            },
            Loading: {}
        };
    }

    /**
     * Show app close dialogue
     * @private
     */
    _handleAppClose(){
        console.log("Close app")
    }
}