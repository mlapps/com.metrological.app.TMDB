import {Lightning} from "@lightningjs/sdk";
import {Button, MovieInfo, Rating, Title} from "../../components";

interface ContentItem {
    voteAverage: number;
    title: string;
    formattedReleaseDate:  string;
    genresAsString: string;
}

type Listeners = {
    titleLoaded: () => void;
    setItem: (e: { item: ContentItem }) => void;
    itemAnimationEnded: () => void;
    [s: string]: (...args: any[]) => void;
};

const listenerEvents: Array<keyof Listeners> = ["ratingColor"];

interface ContentTemplateSpec extends Lightning.Component.TemplateSpecStrong {
    Title: typeof Title,
    Details: {
        Rating: typeof Rating,
        MovieInfo: typeof MovieInfo,
    },
    Button: typeof Button
};

export default class Content
    extends Lightning.Component<ContentTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<ContentTemplateSpec> {

    Title = this.getByRef('Title')!;
    Details = this.getByRef('Details')!;
    Button = this.getByRef('Button')!;
    Rating = this.Details.getByRef('Rating')!;
    MovieInfo = this.Details.getByRef('MovieInfo')!;

    private _detailAnimation = this.animation({duration: 0.6, actions: [
        {t: '', p: 'alpha', rv: 0, v: {0: {v: 0}, 1: {v: 1}}},
        {t: '', p: 'x', rv: 90, v: {0: {v: 130}, 1: {v: 90}}},
    ]});
    private _item: ContentItem | undefined;
    private _details: ContentItem | undefined;

    private listeners: Listeners = {
        titleLoaded: ()=> {
            this._detailAnimation.start();
            this.application.emit("contentHeight", this.Title.renderHeight + 200);
            this.Rating.startAnimation();
            this.h = this.Title.renderHeight + 160;
            this.Details.y = this.Title.renderHeight - 20;
            this.Button.y = this.Title.renderHeight + 120;
            this._refocus();
        },
        setItem: ({item})=> {
            this._item = item;
        },
        itemAnimationEnded: ()=> {
            if (!this._item) return;
            this._setDetails(this._item);
        }
    }

    static _template() {
        return {
            alpha: 0.001,
            Title: {
                type: Title
            },
            Details: {
                Rating: {
                    type: Rating
                },
                MovieInfo: {
                    x: 120, y: 4,
                    type: MovieInfo
                }
            },
            Button: {
                type: Button, label: "Details"
            }
        };
    };

    _init() {
        this._detailAnimation.on("finish", ()=> {
            this.application.emit("readyForBackground");
        });

        this.transition("alpha").on("finish", ()=> {
           this.application.emit("contentHidden");
        });
    }

    _attach() {
        ["titleLoaded", "setItem", "itemAnimationEnded"].forEach((event)=>{
            this.application.on(event, this.listeners[event]!)
        });
    }

    _detach() {
        ["titleLoaded", "setItem", "itemAnimationEnded"].forEach((event)=>{
            this.application.off(event, this.listeners[event]!)
        });
    }

    _setDetails(item: ContentItem) {
        if (this._details === item) return;
        this._details = item;
        this._item =  item;
        this.alpha = 0.001;
        this.Rating.voteAverage = item.voteAverage;
        this.Title.label = item.title;
        this.MovieInfo.info = {date: item.formattedReleaseDate, genres: item.genresAsString};
    }

    hide() {
        this.patch({
            smooth: {alpha: 0, x: 40},
            Button: {
                smooth: {alpha: 0, y: 60}
            }
        });

        ["titleLoaded", "setItem"].forEach((event)=>{
            this.application.off(event, this.listeners[event]!)
        });
    }

}