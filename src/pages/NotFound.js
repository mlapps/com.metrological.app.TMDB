import { Lightning } from '@lightningjs/sdk';

export default class NotFound extends Lightning.Component{
    static _template() {
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