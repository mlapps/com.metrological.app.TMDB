import {Lightning} from "@lightningjs/sdk";

export default class MovieInfo extends Lightning.Component {

    static _template() {
        return {
            Date: {
                y: 8,
                text: {fontFace: "Regular", fontSize: 28, textColor: 0xff767676}
            },
            Genres: {
                y: 50,
                text: {fontFace: "Regular", fontSize: 24, textColor: 0xff21d07a}
            }
        };
    };

    _init() {
        this.listeners = {
            ratingColor: (color)=> {
                this.tag("Genres").text.textColor = color;
            }
        }
    }

    _attach() {
        ["ratingColor"].forEach((event)=>{
            this.application.on(event, this.listeners[event])
        });
    }

    _detach() {
        ["ratingColor"].forEach((event)=>{
            this.application.off(event, this.listeners[event])
        });
    }

    set info({date, genres}) {
        this.tag("Date").text = date;
        this.tag("Genres").text = genres;
    }
}