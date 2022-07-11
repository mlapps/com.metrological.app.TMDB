import {Img, Lightning} from "@lightningjs/sdk";

interface LogoTemplateSpec extends Lightning.Component.TemplateSpecStrong {
    logo: string;
    Logo: {}
}

export default class Logo
    extends Lightning.Component<LogoTemplateSpec>
    implements Lightning.Component.ImplementTemplateSpec<LogoTemplateSpec> {

    Logo = this.getByRef('Logo')!;

    static _template(): Lightning.Component.Template<LogoTemplateSpec> {
        return {
            colorTop: 0xffc3c3c3, colorBottom: 0xffffffff,
            texture: Lightning.Tools.getRoundRect(120, 120, 60, 0, 0xffffffff, true, 0xffffffff),
            mountX: 1, rtt: true,
            Logo: {
                mount: 0.5, x: 60, y: 60
            }
        };
    }


    set logo(v: string) {
        this.Logo.texture = Img(`https://image.tmdb.org/t/p/w300/${v}`).contain(80, 60);
    }
}