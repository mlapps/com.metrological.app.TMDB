// import {Img, Lightning} from "@lightningjs/sdk";
// import {getImgUrl} from "../lib/tools";
// import CircleProgressShader from "../shader/CircleProgressShader";
//
// export default class Background extends Lightning.Component{
//     static _template() {
//         return {
//             Backgrounds: {
//                 w: 1920, h: 1080, rtt: true,
//                 BackgroundA: {
//                     colorLeft: 0x50ffffff, colorRight: 0x0001b4e4,
//                     transitions: {
//                         alpha: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
//                     }
//                 },
//                 BackgroundB: {
//                     colorLeft: 0x50ffffff, colorRight: 0x0001b4e4,
//                     transitions: {
//                         alpha: {duration: 0.3, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
//                     }
//                 }
//             },
//             Details: {
//                 x: 90,
//                 mountY: 0.5, y: 540,
//                 flex: {direction: "column"},
//                 Title: {
//                     alpha: 0.001,
//                 },
//                 SubHeader: {
//                     flexItem: {marginTop: -20},
//                     flex: {},
//                     alpha: 0, rtt: true,
//                     Rating: {
//                         texture: Lightning.Tools.getRoundRect(100, 100, 50, 0, 0x00ffffff, true, 0xff081C22),
//                         RatingNumber: {
//                             mount: .5, x: w=>w / 2 + 2, y: h=>h / 2 + 4,
//                             flex: {},
//                             Number: {
//                                 text: {text: '0', fontSize: 38, fontFace: "SemiBold"}
//                             },
//                             Percentage: {
//                                 flexItem: {marginTop: 10},
//                                 text: {text: '%', fontSize: 12, fontFace: "SemiBold"}
//                             }
//                         },
//                         RatingCircle: {
//                             rect:true, color: 0x00ffffff, rtt:true, mount: .5, x: 51, y: 51, w: 90, h: 90, rotation: Math.PI * .5,
//                             shader: {
//                                 type: CircleProgressShader, radius: 45, width: 5, angle: 0.0001, smooth: 0.01, color: 0xffd1215c, backgroundColor: 0xff204529
//                             }
//                         }
//                     },
//                     Metadata: {
//                         flex: {direction: "column"},
//                         flexItem: {marginLeft: 20},
//                         Date: {
//                             flexItem: {marginTop: 8},
//                             text: {fontFace: "Regular", fontSize: 32, textColor: 0xffaaaaaa}
//                         },
//                         Genres: {
//                             flexItem: {marginTop: -4},
//                             text: {fontFace: "Regular", fontSize: 24, textColor: 0xff21d07a}
//                         }
//                     }
//                 },
//                 ButtonHolder: {
//                     flexItem: {marginTop: 60},
//                     color: 0xff21d07a, alpha: 0, rtt: true,
//                     texture: Lightning.Tools.getRoundRect(180, 60, 30, 0, 0xff21d07a, true, 0xffffffff),
//                     Button: {
//                         x: 5, y: 5,
//                         texture: Lightning.Tools.getRoundRect(50, 50, 25, 0, 0xff21d07a, true, 0xff081C22),
//                         Ok: {
//                             mount: 0.5, x: 26, y: 28,
//                             text: {text: "OK", fontFace: "SemiBold", fontSize: 19}
//                         }
//                     },
//                     Label: {
//                         mountY: 0.5, x: 68, y: 32,
//                         text: {text: "Details", fontFace: "Regular", fontSize: 28, textColor: 0xff081C22}
//                     }
//                 }
//             }
//         };
//     }
//
//     _init() {
//         this._index = 0;
//         this._voteAverage = 0;
//
//         this._detailAnimation = this.animation({duration: 0.6, actions: [
//             {t: 'Title', p: 'alpha', rv: 0, v: {0: {v: 0}, 1: {v: 1}}},
//             {t: 'Title', p: 'y', rv: 40, v: {0: {v: 20}, 1: {v: 0}}},
//             {t: 'SubHeader', p: 'alpha', rv: 0, v: {0: {v: 0}, 1: {v: 1}}},
//             {t: 'SubHeader', p: 'y', rv: 40, v: {0: {v: 40}, 1: {v: 0}}},
//             {t: 'ButtonHolder', p: 'alpha', rv: 0, v: {0: {v: 0}, 1: {v: 1}}},
//             {t: 'ButtonHolder', p: 'y', rv: 40, v: {0: {v: -20}, 1: {v: 0}}}
//         ]});
//
//         this._ratingAnimation = this.animation({
//             duration: 0.8, timingFunction: 'cubic-bezier(.94,.42,.49,.99)', actions:[
//                 {t: 'RatingCircle', p:'shader.angle', rv: 0.0001, v: (e) => {
//                     return (this._voteAverage/10) * e;
//                 }},
//                 {t: 'Number', p:'text.text', rv: 0, v: (e) => {
//                     return `${Math.floor((this._voteAverage*10) * e)}`;
//                 }}
//             ]
//         });
//
//         this.tag("Title").on("txLoaded", ()=> {
//             this._detailAnimation.start();
//             this._ratingAnimation.start();
//             this.application.emit("detailHeight", this.tag("Title").renderHeight + 200);
//         });
//
//         this.application.on("setItem", ({item})=> {
//             clearTimeout(this._timeout);
//             this._timeout = setTimeout(()=> {
//                 this._setBackground(item);
//                 this._setDetails(item);
//             }, 200);
//         });
//     }
//
//     _setBackground(item) {
//         if (item === this._item) {
//             return;
//         }
//
//         const src = getImgUrl(item.background, 1280);
//
//         this.tag("Backgrounds").children[this._index].patch({
//             texture: Img(src).contain(1920, 1080),
//             smooth: {
//                 alpha: 1
//             }
//         });
//         this._index ^= 1;
//         this.tag("Backgrounds").children[this._index].patch({
//             smooth: {
//                 alpha: 0
//             }
//         });
//     }
//
//     _setDetails(item) {
//         this._voteAverage = item.voteAverage;
//
//         let fontSize = 128;
//         let lineHeight = 132;
//         let wordWrapWidth = 800;
//         if (item.title.length > 12 && item.title.length < 24) {
//             fontSize = 108;
//             lineHeight = 112;
//             wordWrapWidth = 900;
//         } else if (item.title.length >= 24) {
//             fontSize = 88;
//             lineHeight = 92;
//             wordWrapWidth = 1000;
//         }
//
//         let color = 0xff21d07a;
//         let backgroundColor = 0xff204529;
//         if (this._voteAverage/10 < 0.5) {
//             color = 0xffd1215c;
//             backgroundColor = 0xff571435;
//         } else if (this._voteAverage/10 >= 0.5 && this._voteAverage/10 <= 0.7) {
//             color = 0xffd2d531;
//             backgroundColor = 0xff423d0f;
//         }
//         this._setThemeColor({color, backgroundColor});
//
//         this.tag("Title").patch({
//             alpha: 0.001, text: {fontFace: "Black", text: item.title, fontSize, lineHeight, wordWrapWidth}
//         });
//
//         this.tag("SubHeader").alpha = 0.001;
//         this.tag("ButtonHolder").alpha = 0.001;
//
//         const date = new Date(item.releaseDate);
//         this.tag("Date").text = `${date.toLocaleString('default', { month: 'long' })} ${date.getDate()} ${date.getFullYear()}`;
//
//         let genres = "";
//         item.genres.forEach((genre, index) => {
//             if (index > 0) {
//                 genres += ` | ${genre.name}`
//             } else {
//                 genres += `${genre.name}`
//             }
//         });
//         this.tag("Genres").text = genres;
//     }
//
//     _setThemeColor(v) {
//         this._themeColor = v.color;
//         this.tag("ButtonHolder").color = v.color;
//         this.tag("Genres").text.textColor = v.color;
//         this.tag("RatingCircle").shader.color = v.color;
//         this.tag("RatingCircle").shader.backgroundColor = v.backgroundColor;
//     }
// }