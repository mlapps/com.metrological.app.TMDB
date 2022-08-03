import { Lightning } from '@lightningjs/sdk';

interface NotFoundTypeConfig extends Lightning.Component.TypeConfig {
    IsPage: true;
}

export default class NotFound
    extends Lightning.Component<
        Lightning.Component.TemplateSpecLoose,
        NotFoundTypeConfig
    > {
    static override _template(): Lightning.Component.Template {
        return {
           Label:{
               x: 960, y: 530,
               text:{
                   text:'Page not found'
               }
           }
        };
    }
}