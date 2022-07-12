import type { ContentItem } from "./pages/popular/Content";
import type { Menu } from "./widgets";

declare module "@lightningjs/sdk" {
    namespace Lightning {
        namespace Application {
            /**
             * Definitions of the app specific events (emitted from/onto the Application instance)
             */
            interface EventMap {
                titleLoaded(): void;
                ratingColor(color: number): void;
                setBackground(evt: { src: string }): void;
                contentHeight(height: number): void;
                backgroundLoaded(): void;
                readyForBackground(): void;
                itemAnimationEnded(): void;
                setItem(evt: { item: ContentItem, direction?: -1 | 0 | 1 }): void;
                contentHidden(): void;
            }
        }
    }
    namespace Router {
        /**
         * Definitions of the app specific widgets
         */
        interface Widgets {
            menu: Menu;
            detailsmenu: Menu;
            peoplemenu: Menu;
        }
      }
}
