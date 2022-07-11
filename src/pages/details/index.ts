import {Lightning, Router} from "@lightningjs/sdk";
import {MovieInfo, Rating, Title} from "../../components";
import { ContentItem } from "../popular/Content";
import Logo from "./Logo";

export interface DetailsTemplateSpec extends Lightning.Component.TemplateSpecStrong {
    content: any;
    detailsType: string;
    Item: {
        Title: typeof Title,
        Details: {
            Rating: typeof Rating,
            MovieInfo: typeof MovieInfo
        },
        Holder: {
            Overview: {}
        }
    },
    LogosHolder: {
        Logos: {}
    }
}

export default class Details
    extends Lightning.Component<DetailsTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<DetailsTemplateSpec> {

    Item = this.getByRef('Item')!;
    LogosHolder = this.getByRef('LogosHolder')!;
    Logos = this.LogosHolder.getByRef('Logos')!;
    Title = this.Item.getByRef('Title')!;
    Details = this.Item.getByRef('Details')!;
    Rating = this.Details.getByRef('Rating')!;
    MovieInfo = this.Details.getByRef('MovieInfo')!;
    Holder = this.Item.getByRef('Holder')!;
    Overview = this.Holder.getByRef('Overview')!;
    listeners = {
        titleLoaded: ()=> {
            this.Rating.startAnimation(true);
            this.h = this.Title.renderHeight + 160;
            this.Details.y = this.Title.renderHeight - 20;
            this.Holder.y = this.Title.renderHeight + 100;
            this.application.emit("contentHeight", 0);
        },
        backgroundLoaded: ()=> {
            this.Logos.children.forEach(logo => {
                logo.setSmooth("x", 0);
                logo.setSmooth("alpha", 1);
            });
        }
    };
    private _item!: ContentItem;
    private _detailsType: string = '';

    static _template(): Lightning.Component.Template<DetailsTemplateSpec> {
        return {
            Item: {
                x: 90,
                mountY: 0.5, y: 514,
                transitions: {
                    alpha: {duration: 0.3, delay: 0.1, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    mountY: {duration: 0.3, delay: 0.1, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    y: {duration: 0.3, delay: 0.1, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    x: {duration: 0.6, delay: 0.4, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                },
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
                Holder: {
                    alpha: 0,
                    transitions: {
                        alpha: {duration: 0.6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                        y: {duration: 0.6, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                    },
                    Overview: {
                        text: {fontFace: "Regular", fontSize: 24, lineHeight: 44, textColor: 0xffc3c3c3, wordWrapWidth: 1000}
                    }
                }
            },
            LogosHolder: {
                y: 120,
                Logos: {
                    mountX: 1, x: 1830
                }
            }
        };
    };

    _init() {
        this.Item.transition("y").on("finish", ()=> {
            this.Holder.y = this.Holder.y + 30;
            this.Holder.patch({
                smooth: {
                    alpha: 1, y: this.Holder.y - 30
                }
            });
        });

        this.Holder.transition("y").on("finish", ()=> {
            this.application.emit("readyForBackground");
        });

        this.transition("alpha").on("finish", ()=> {
            this.widgets.detailsmenu.select("cast");
            Router.navigate(`cast/${this._detailsType}/${this._item.id}`, true);
        });
    }

    _attach() {
        this.application.on('titleLoaded', this.listeners['titleLoaded']);
        this.application.on('backgroundLoaded', this.listeners['backgroundLoaded']);
    }

    _detach() {
        this.application.off('titleLoaded', this.listeners['titleLoaded']);
        this.application.off('backgroundLoaded', this.listeners['backgroundLoaded']);
    }

    _active() {
        this.patch({
            Item: {
                smooth: {y: 110, x: 110, mountY: 0}
            }
        });

        this.widgets.detailsmenu.select("details", true);
    }

    _inactive() {
        this.patch({
            Item: {
                smooth: {y: 514, x: 90, mountY: 0.5}
            }
        });
    }

    set content(v: ContentItem) {
        this._item = v;

        this.Title.label = this._item.title;
        this.MovieInfo.info = {date: this._item.formattedReleaseDate, genres: this._item.genresAsString};
        this.Overview.text = this._item.overview;
        this.Rating.voteAverage = this._item.voteAverage;

        let logoIndex = 0;
        this._item.productionCompanies.forEach(company => {
            if (company.logo_path !== null && logoIndex < 6) {
                this.Logos.childList.a(this.stage.c({
                    type: Logo, logo: company.logo_path, y: logoIndex * 140,
                    x: 30, alpha: 0.001,
                    transitions: {
                        alpha: {duration: 0.6, delay: 0.15 * logoIndex, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                        x: {duration: 0.6, delay: 0.15 * logoIndex, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                    }
                }));
                logoIndex++;
            }
        });

        this.application.emit("setItem", {item: this._item});
    }

    set detailsType(v: string) {
        this._detailsType = v;
    }

    _handleDown() {
        this.patch({
            smooth: {alpha: 0}
        });
    }
}