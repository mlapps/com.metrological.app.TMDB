import {Lightning} from "@lightningjs/sdk";
import {Button, MovieInfo, Rating, Title} from "../../components";

export default class Content extends Lightning.Component {

    static _template() {
        return {
            flex: {direction: "column"},
            alpha: 0.001,
            Title: {
                type: Title
            },
            Details: {
                flex: {}, rtt: true,
                flexItem: {marginTop: -20},
                Rating: {
                    type: Rating
                },
                MovieInfo: {
                    flexItem: {marginLeft: 20},
                    type: MovieInfo
                }
            },
            Button: {
                type: Button
            }
        };
    };

    _init() {
        this._detailAnimation = this.animation({duration: 0.6, actions: [
            {t: '', p: 'alpha', rv: 0, v: {0: {v: 0}, 1: {v: 1}}},
            {t: '', p: 'x', rv: 90, v: {0: {v: 130}, 1: {v: 90}}},
        ]});

        this.listeners = {
            titleLoaded: ()=> {
                this._detailAnimation.start();
                this.application.emit("contentHeight", this.tag("Title").renderHeight + 200);
                this.tag("Rating").startAnimation();
            },
            setItem: ({item})=> {
                clearTimeout(this._timeout);
                this._timeout = setTimeout(()=> {
                    this._setDetails(item);
                }, 400);
            }
        }
    }

    _attach() {
        ["titleLoaded", "setItem"].forEach((event)=>{
            this.application.on(event, this.listeners[event])
        });
    }

    _detach() {
        ["titleLoaded", "setItem"].forEach((event)=>{
            this.application.off(event, this.listeners[event])
        });
    }

    _setDetails(item) {
        this.alpha = 0.001;
        this.tag("Rating").voteAverage = item.voteAverage;
        this.tag("Title").label = item.title;
        this.tag("MovieInfo").info = {date: item.formattedReleaseDate, genres: item.genresAsString};
    }

    hide() {
        this.patch({
            Button: {
                smooth: {alpha: 0, y: 60}
            }
        });

        ["titleLoaded", "setItem"].forEach((event)=>{
            this.application.off(event, this.listeners[event])
        });
    }

}