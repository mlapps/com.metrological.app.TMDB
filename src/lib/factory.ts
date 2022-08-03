import { Lightning } from "@lightningjs/sdk";
import { Item, FlipList, Actor, List } from "../components";
import { ContainerModel, DetailsModel, CastModel, PersonModel } from "./models";
import { CastData } from "./models/CastModel";
import { ContainerData } from "./models/ContainerModel";
import { DetailsData } from "./models/DetailsModel";
import { PersonData } from "./models/PersonModel";
import { Genre } from "./types";


let stage: Lightning.Stage;

export const init = (stageInstance: Lightning.Stage) =>{
    stage = stageInstance;
};

export function list(type: 'cast', data: CastData): List | null;
export function list(type: 'tv' | 'movie', data: ContainerData, genres: Genre[]): FlipList | null;
export function list(type: string, data: ContainerData | CastData, genres?: Genre[]): FlipList | List | null {
    if (type !== 'movie' && type !== 'tv' && type !== 'cast') {
        return null;
    }
    let model: ContainerModel | CastModel | undefined;
    if ((type === 'movie' || type === 'tv') && genres) {
        model = new ContainerModel(data as ContainerData, type, genres);
    } else if (type === 'cast') {
        model = new CastModel(data as CastData, type);
    }

    if (!model || model.items.length === 0) {
        return null;
    } else if (model instanceof ContainerModel) {
        return stage.c<typeof FlipList<typeof Item>>({
            type: FlipList,
            itemConstruct: Item,
            items: model.items
        });
    } else {
        return stage.c<typeof List<typeof Actor>>({
            type: List,
            itemConstruct: Actor,
            items: model.items
        });
    }
};

export const details = (data: DetailsData) => {
    return new DetailsModel(data);
};

export const people = (data: PersonData) => {
    return new PersonModel(data);
};