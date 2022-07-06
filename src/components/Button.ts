import {Lightning} from "@lightningjs/sdk";

interface ButtonTemplateSpec extends Lightning.Component.TemplateSpecStrong {
    label: string,
    Button: {
        Ok: {}
    },
    Label: {}
}

type Listeners = {
    ratingColor: (color: number) => void;
};

const listenerEvents: Array<keyof Listeners> = ["ratingColor"];

export default class Button
    extends Lightning.Component<ButtonTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<ButtonTemplateSpec> {

    Button = this.getByRef('Button')!;
    Label = this.getByRef('Label')!;
    listeners: Listeners = {
        ratingColor: (color: number)=> {
            this.color = color;
        }
    };

    static _template(): Lightning.Component.Template<ButtonTemplateSpec> {
        return {
            color: 0xff21d07a, rtt: true,
            texture: Lightning.Tools.getRoundRect(180, 60, 30, 0, 0xff21d07a, true, 0xffffffff),
            transitions: {
                alpha: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                y: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
            },
            Button: {
                x: 5, y: 5,
                texture: Lightning.Tools.getRoundRect(50, 50, 25, 0, 0xff21d07a, true, 0xff081C22),
                Ok: {
                    mount: 0.5, x: 26, y: 28,
                    text: {text: "OK", fontFace: "Regular", fontSize: 19}
                }
            },
            Label: {
                mount: 0.5, x: 114, y: 33,
                text: {text: "Details", fontFace: "Regular", fontSize: 24, textColor: 0xff081C22}
            }
        };
    };

    set label(v: string) {
        this.Label.text = v;
    }

    _active() {
        listenerEvents.forEach((event)=>{
            this.application.on(event, this.listeners[event]) // !!! eventemitter
        });
    }

    _inactive() {
        listenerEvents.forEach((event)=>{
            this.application.off(event, this.listeners[event]) // !!! eventemitter
        });
    }

}