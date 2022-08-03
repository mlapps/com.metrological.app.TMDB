import { Lightning, Utils, Router } from '@lightningjs/sdk';
import {routes} from "./lib/routes";
import {init as initFactory} from "./lib/factory"
import {Menu} from "./widgets"
import {Background} from "./components";
import {Protanopia, Deuteranopia, Tritanopia, ColorShift, Achromatopsia} from "./shader";
const correction = {
    Protanopia, Deuteranopia, Tritanopia, ColorShift, Achromatopsia
};

export interface AppTemplateSpec extends Router.App.TemplateSpec {
    ColorCorrection: {
        Background: typeof Background,
        Holder: {
            Fps: {
                Amount: object,
                Unit: object
            },
            Average: {
                Amount: object,
                Unit: object
            }
        },
        Widgets: {
            Menu: typeof Menu<'movie' | 'tv' | 'accessibility'>,
            DetailsMenu: typeof Menu<'details' | 'cast' | 'similar'>,
            PeopleMenu: typeof Menu<'details' | 'moviecredits' | 'tvcredits'> ,
        },
        Loading: object
    }
}

export default class App extends Router.App<AppTemplateSpec> implements Lightning.Component.ImplementTemplateSpec<AppTemplateSpec> {
    ColorCorrection = this.getByRef('ColorCorrection')!;
    Fps = this.ColorCorrection.getByRef('Holder')!.getByRef('Fps')!;
    Average = this.ColorCorrection.getByRef('Holder')!.getByRef('Average')!;
    Fps_Amount = this.Fps.getByRef('Amount')!;
    Average_Amount = this.Average.getByRef('Amount')!;

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
    override _setup() {
        initFactory(this.stage);
        Router.startRouter(routes, this);
    }

    override _init() {
        this.stage.on('correctColor', ({ settings: {b,c,s,i} }) => {
            if (s === null) return;
            if(correction[s]){
                this.ColorCorrection.rtt = true;
                this.ColorCorrection.shader = {
                    type: correction[s], brightness: b, contrast:c
                };
            }else{
                this.ColorCorrection.shader = null;
                this.ColorCorrection.rtt = false;
            }
        });

        const times: number[] = [];
        let fps;
        let totalFps = 0;
        let totalFrames = 0;

        const refreshLoop = ()=> {
            window.requestAnimationFrame(() => {
                const now = performance.now();
                while (times.length > 0 && times[0]! <= now - 1000) {
                    times.shift();
                }
                times.push(now);
                fps = times.length;


                this.Fps_Amount.text= `${fps}`
                totalFps += fps;
                totalFrames++;
                this.Average_Amount.text = `${Math.round(totalFps/totalFrames)}`

                refreshLoop();
            });
        }

        refreshLoop();
    }

    static override _template(): Lightning.Component.Template<AppTemplateSpec> {
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
                    Menu: {
                        type: Menu, x: 90, y: 90, zIndex: 99, visible: false, lineOffset: 24,
                        items: [
                            {label: "Movies", itemId: "movie", selected: true},
                            {label: "TV", itemId: "tv", selected: false},
                            {label: "Accessibility", itemId: "accessibility", selected: false}
                        ]
                    },
                    DetailsMenu:{
                        type: Menu, x: 90, y: 60, zIndex: 99, visible: false, lineOffset: 0,
                        items: [
                            {label: "About", itemId: "details", selected: true},
                            {label: "Cast", itemId: "cast", selected: false},
                            {label: "Similar", itemId: "similar", selected: false}
                        ]
                    },
                    PeopleMenu:{
                        type: Menu, x: 90, y: 60, zIndex: 99, visible: false, lineOffset: 0,
                        items: [
                            {label: "Biography", itemId: "details", selected: true},
                            {label: "Movie credits", itemId: "moviecredits", selected: false},
                            {label: "TV credits", itemId: "tvcredits", selected: false}
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
    override _handleAppClose() {
        console.log("Close app")
    }
}
