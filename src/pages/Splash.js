import {Lightning, Utils, Router} from "@lightningjs/sdk";

export default class Splash extends Lightning.Component{

    static _template() {
        return {
            Background: {
                w: 1920, h: 1080, colorBottom: 0xff000000, scale: 1.2,
                src: Utils.asset("images/background.png"),
                transitions: {
                    scale: {duration: 1, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                }
            },
            Logo: {
                src: Utils.asset("images/logo-large.png"),
                mount: .5, x: 960, y: 640, alpha: 0.001,
                transitions: {
                    alpha: {duration: 1, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'},
                    y: {duration: 1, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                }
            },
            Spinner: {
                src: Utils.asset("images/spinner.png"),
                mountX: .5, x: 960, y: 920, alpha: 0.001, color: 0xaaffffff,
                transitions: {
                    alpha: {duration: 1, timingFunction: 'cubic-bezier(0.20, 1.00, 0.80, 1.00)'}
                }
            }
        };
    }

    _init() {
        this.tag("Logo").on("txLoaded", ()=> {
            this.tag("Logo").setSmooth("alpha", 1);
            this.tag("Logo").setSmooth("y", 540);
            this.tag("Background").setSmooth("scale", 1);
        });

        this.tag("Spinner").on("txLoaded", ()=> {
            this.tag("Spinner").setSmooth("alpha", 1);
            this._spinnerAnimation.start();
        });

        this.application.on("booted", ()=> {
             Router.navigate("movies", false)
        });

        this._spinnerAnimation = this.animation({duration: 1, repeat: -1, actions: [
            {t: 'Spinner', p: "rotation", sm: 0, v: function(t) {
                    if (t < .125) {
                        return 45 * (Math.PI/180);
                    } else if (t < .250) {
                        return 90 * (Math.PI/180);
                    } else if (t < .375) {
                        return 135 * (Math.PI/180);
                    } else if (t < .500) {
                        return 180 * (Math.PI/180);
                    } else if (t < .625) {
                        return 225 * (Math.PI/180);
                    } else if (t < .750) {
                        return 270 * (Math.PI/180);
                    } else if (t < .875) {
                        return 315 * (Math.PI/180);
                    } else if (t < 1) {
                        return 360 * (Math.PI/180);
                    }
                }}
        ]});

        setTimeout(()=> {
            Router.navigate("movies", false);
        }, 3000);
    }

    _active() {
        this.widgets.menu.visible = false;
    }

    _inactive() {
        this._spinnerAnimation.stop()
    }

}