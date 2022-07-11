import {Lightning, Router} from "@lightningjs/sdk";

export interface ErrorTemplateSpec extends Lightning.Component.TemplateSpecStrong {
    Label: {}
}

export default class Error
    extends Lightning.Component<ErrorTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<ErrorTemplateSpec> {

    Label = this.getByRef('Label')!;

    static _template(): Lightning.Component.Template<ErrorTemplateSpec> {
        return {
            rect: true, w: 1920, h: 1080,
            color: 0xffb70606,
            Label:{
                x: 100, y: 100,
                text:{
                    text:'Error', fontSize:22
                }
            }
        }
    }

    _handleEnter(){
        Router.navigate("main")
    }

    _focus(){
        console.log("focus error page")
    }

    set error(obj: { page: any, error: Error }){
        const {page, error} = obj;
        console.log(page, error);

        const errorMessage = `
error while loading page: ${page.constructor.name}
press enter to navigate to home
--
loaded via hash: ${page[Symbol.for("hash")]}
resulted in route: ${page[Symbol.for("route")]}
--
${error.toString()}`

        this.Label.text = errorMessage;
    }

    easing(){
        return "up";
    }
}