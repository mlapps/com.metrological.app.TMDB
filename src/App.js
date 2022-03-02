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

    _init() {
        const times = [];
        let fps;
        const el = document.getElementById("fps");
        const refreshLoop = ()=> {
            window.requestAnimationFrame(() => {
                const now = performance.now();
                while (times.length > 0 && times[0] <= now - 1000) {
                    times.shift();
                }
                times.push(now);
                fps = times.length;
                this.tag("Fps").text= `${fps} FPS`
                refreshLoop();
            });
        }

        refreshLoop();
    }

    static _template() {
        return {
            // we MUST spread the base-class template
            // if we want to provide Widgets.
            Background: {
                type: Background
            },
            ...super._template(),
            Holder:{ zIndex:9999,
                Fps:{
                    mountX: 1, x: 1900, y: 20,
                    text:{
                        text:'', fontFace: "regular", fontSize: 24
                    }
                }

            },
            Widgets: {
                Menu:{
                    type: Menu, x: 90, y: 90, zIndex: 99, visible: false, lineOffset: 24,
                    items: [
                        {label: "Movies", id: "movie", selected: true},
                        {label: "TV", id: "tv", selected: false}
                    ]
                },
                DetailsMenu:{
                    type: Menu, x: 90, y: 60, zIndex: 99, visible: false, lineOffset: 0,
                    items: [
                        {label: "About", id: "details", selected: true},
                        {label: "Cast", id: "cast", selected: false},
                        {label: "Similar", id: "similar", selected: false}
                    ]
                },
                PeopleMenu:{
                    type: Menu, x: 90, y: 60, zIndex: 99, visible: false, lineOffset: 0,
                    items: [
                        {label: "Biography", id: "details", selected: true},
                        {label: "Movie credits", id: "moviecredits", selected: false},
                        {label: "TV credits", id: "tvcredits", selected: false}
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