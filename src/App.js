import { Utils, Router } from '@lightningjs/sdk';
import routes from "./lib/routes";
import {init as initFactory} from "./lib/factory";
import {init as initEndpoints} from "./lib/endpoints";
import {Menu} from "./widgets";
import {Background} from "./components";
import {Protanopia, Deuteranopia, Tritanopia, ColorShift, Achromatopsia} from "./shader";
const correction = {
    Protanopia, Deuteranopia, Tritanopia, ColorShift, Achromatopsia
};

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
        initEndpoints(this.stage.application.config);
        Router.startRouter(routes, this);

        console.log('WVB:', this.stage.application.config.local);
    }

    _init() {
        this.stage.on('correctColor', ({settings:{b,c,s,i}}) => {
            if(correction[s]){
                this.tag("ColorCorrection").rtt = true;
                this.tag("ColorCorrection").shader = {
                    type: correction[s], brightness: b, contrast:c
                };
            }else{
                this.tag("ColorCorrection").shader = null;
                this.tag("ColorCorrection").rtt = false;
            }
        });

        const times = [];
        let fps;
        let totalFps = 0;
        let totalFrames = 0;

        const refreshLoop = ()=> {
            window.requestAnimationFrame(() => {
                const now = performance.now();
                while (times.length > 0 && times[0] <= now - 1000) {
                    times.shift();
                }
                times.push(now);
                fps = times.length;


                this.tag("Fps").tag("Amount").text= `${fps}`
                totalFps += fps;
                totalFrames++;
                this.tag("Average").tag("Amount").text = `${Math.round(totalFps/totalFrames)}`

                refreshLoop();
            });
        }

        refreshLoop();
    }

    static _template() {
        return {
            // we MUST spread the base-class template
            // if we want to provide Widgets.
            ColorCorrection: {
                rtt: false, w: 1920, h: 1080,
                Background: {
                    type: Background
                },
                ...super._template(),
                Holder:{ zIndex:9999,
                    Fps:{
                        mountX: 1, x: 1760, y: 40,
                        Amount: {
                            text:{
                                text:'-', fontFace: "regular", fontSize: 24
                            }
                        },
                        Unit: {
                            x: 54, y: 6,
                            text:{
                                text:'FPS', fontFace: "regular", textColor: 0xffc3c3c3, fontSize: 14
                            }
                        }
                    },
                    Average:{
                        mountX: 1, x: 1760, y: 74,
                        Amount: {
                            text:{
                                text:'-', fontFace: "regular", fontSize: 24
                            }
                        },
                        Unit: {
                            x: 54, y: 6,
                            text:{
                                text:'Avg. FPS', textColor: 0xffc3c3c3, fontFace: "regular", fontSize: 14
                            }
                        }
                    }

                },
                Widgets: {
                    Menu:{
                        type: Menu, x: 90, y: 90, zIndex: 99, visible: false, lineOffset: 24,
                        items: [
                            {label: "Movies", id: "movie", selected: true},
                            {label: "TV", id: "tv", selected: false},
                            {label: "Accessibility", id: "accessibility", selected: false}
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
            }
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
