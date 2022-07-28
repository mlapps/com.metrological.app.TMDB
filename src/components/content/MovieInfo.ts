import lightning from "@lightningjs/core/src/lightning.mjs";
import {Lightning} from "@lightningjs/sdk";

export interface MovieInfoInfo {
    date: string;
    genres: string;
}

interface MovieIntoTemplateSpec extends lightning.Component.TemplateSpecStrong {
    info: MovieInfoInfo;
    Date: {};
    Genres: {};
}

export default class MovieInfo
    extends Lightning.Component<MovieIntoTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<MovieIntoTemplateSpec> {

    Date = this.getByRef('Date')!;
    Genres = this.getByRef('Genres')!;
    listeners = {
        ratingColor: (color: number)=> {
            this.Genres.text!.textColor = color;
        }
    }

    static override _template(): Lightning.Component.Template<MovieIntoTemplateSpec> {
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

    override _init() {
        this.listeners = {
            ratingColor: (color)=> {
                this.Genres.text!.textColor = color;
            }
        }
    }

    override _attach() {
        this.application.on('ratingColor', this.listeners['ratingColor']);
    }

    override _detach() {
        this.application.on('ratingColor', this.listeners['ratingColor']);

    }

    set info({date, genres}: MovieInfoInfo) {
        this.Date.text = date;
        this.Genres.text = genres;
    }
}