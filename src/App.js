import { Utils, Router } from '@lightningjs/sdk';
import routes from "./lib/routes";
import {init as initFactory} from "./lib/factory"
import {Menu} from "./widgets"
import {Background} from "./components";

export default class App extends Router.App {
    static getFonts() {
        return [
            {family: 'Light', url: Utils.asset('fonts/Inter-Light.ttf'), descriptors: {}},
            {family: 'Regular', url: Utils.asset('fonts/Inter-Regular.ttf'), descriptors: {}},
            {family: 'Black', url: Utils.asset('fonts/Inter-Black.ttf'), descriptors: {}},
            {family: 'SemiBold', url: Utils.asset('fonts/Inter-SemiBold.ttf'), descriptors: {}},
            {family: 'Bold', url: Utils.asset('fonts/Inter-Bold.ttf'), descriptors: {}}
        ];
    }

    // when App instance is initialized we call the routes
    // this will setup all pages and attach them to there route
    _setup() {
        initFactory(this.stage);
        Router.startRouter(routes, this);
    }

    static _template() {
        return {
            // we MUST spread the base-class template
            // if we want to provide Widgets.
            Background: {
                type: Background
            },
            ...super._template(),
            Widgets: {
                Menu:{
                    type: Menu, x: 90, y: 60, zIndex: 99, visible: false,
                    items: [
                        {label: "Movies", id: "movie", selected: true},
                        {label: "TV", id: "tv", selected: false},
                        {label: "Search", id: "search", selected: false}
                    ]
                },
                DetailsMenu:{
                    type: Menu, x: 90, y: 60, zIndex: 99, visible: false,
                    items: [
                        {label: "Details", id: "details", selected: true},
                        {label: "Cast", id: "cast", selected: false},
                        {label: "Similar", id: "similar", selected: false}
                    ]
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