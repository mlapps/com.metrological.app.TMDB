declare module '@lightningjs/sdk' {
  import lng from '@lightningjs/core';

  export import Lightning = lng;

  namespace Router {
    namespace App {
        interface TemplateSpecStrong extends lng.Component.TemplateSpecStrong {

        }

        interface TemplateSpecLoose extends lng.Component.TemplateSpecStrong {
            [s: string]: any
        }
    }


    class App<
        TemplateSpec extends App.TemplateSpecLoose
    > extends lng.Component<TemplateSpec> {

    }
  }

  class Router {
    static startRouter(...args: any[]): void;
    static navigate(...args: any[]): void;
  }

  class Utils {
    static asset(path: string): string;
  }

}