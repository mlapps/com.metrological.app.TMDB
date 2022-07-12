// This has to be in another file because local declaration of Lightning in sdk.d.ts conflicts with this local def

declare module '@lightningjs/sdk' {
  import { Router } from '@lightningjs/sdk';
  namespace Lightning {
    interface Component {
      widgets: { [s in keyof Router.Widgets]: Router.Widgets[s] }
    }
  }
}
