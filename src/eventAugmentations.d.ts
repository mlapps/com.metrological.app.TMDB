import type { ContentItem } from "./pages/popular/Content";

declare module "@lightningjs/sdk" {
  namespace Lightning {
      namespace Application {
          interface EventMap {
              titleLoaded(): void;
              ratingColor(color: number): void;
              setBackground(evt: { src: string }): void;
              contentHeight(height: number): void;
              backgroundLoaded(): void;
              readyForBackground(): void;
              itemAnimationEnded(): void;
              setItem(evt: { item: ContentItem }): void;
              contentHidden(): void;
          }
      }
  }
}
