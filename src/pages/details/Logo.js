import {Img, Lightning} from "@lightningjs/sdk";

export default class Logo extends Lightning.Component {
    static _template() {
        return {
            colorTop: 0xffc3c3c3, colorBottom: 0xffffffff,
            texture: Lightning.Tools.getRoundRect(120, 120, 60, 0, 0xffffffff, true, 0xffffffff),
            mountX: 1, rtt: true,
            Logo: {
                mount: 0.5, x: 60, y: 60
            }
        };
    }

    set logo(v) {
        this.tag("Logo").texture = Img(`https://image.tmdb.org/t/p/w300/${v}`).contain(80, 60);
    }
}