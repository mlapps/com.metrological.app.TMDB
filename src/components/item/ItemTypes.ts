import { Lightning } from "@lightningjs/sdk";
import { MovieModel, TvModel } from "../../lib/models";
import { CastPersonData } from "../../lib/models/CastModel";
import DetailsModel from "../../lib/models/DetailsModel";

/**
 * The `Item` class implements this and is required like this by the `FlipList` component
 */
export interface FlipListItemConstructorBase {
  new (...args: any[]): Lightning.Component & {
      item: DetailsModel | TvModel | MovieModel | undefined;
      animatePosition(): void;
      focusedItem: boolean;
  };
  get width(): number;
  get height(): number;
  get offset(): number;
}

/**
 * The `Actor` class implements this and is required like this by the `List` component
 */
export interface ListItemConstructorBase {
  new (...args: any[]): Lightning.Component & {
      item: CastPersonData | undefined;
  };
  get width(): number;
  get height(): number;
  get offset(): number;
}

export type GenericItemConstructorBase = ListItemConstructorBase | FlipListItemConstructorBase;

/**
 * Get the ItemType from an ItemConstructor
 */
export type ItemType<ItemConstructor extends GenericItemConstructorBase> = InstanceType<ItemConstructor>['item'];