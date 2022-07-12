import { Lightning } from "@lightningjs/sdk";
import { Item, FlipList, Actor, List } from "../components";
import { Container, Details, Cast, People } from "./models";
import { CastData } from "./models/Cast";
import { ContainerData } from "./models/Container";
import { DetailsData } from "./models/Details";
import { PeopleData } from "./models/People";
import { Genre } from "./types";


let stage: Lightning.Stage;

export const init = (stageInstance: Lightning.Stage) =>{
    stage = stageInstance;
};

export const list = (type: string, data: ContainerData | CastData, genres?: Genre[]): FlipList | List | null => {
    if (type !== 'movie' && type !== 'tv' && type !== 'cast') {
        return null;
    }
    let model: Container | Cast | undefined;
    if ((type === 'movie' || type === 'tv') && genres) {
        model = new Container(data as ContainerData, type, genres);
    } else if (type === 'cast') {
        model = new Cast(data as CastData, type);
    }

    if (!model || model.items.length === 0) {
        return null;
    } else if (type === 'movie' || type === 'tv') {
        return stage.c<typeof FlipList>({
            type: FlipList,
            itemConstruct: Item,
            items: model.items
        });
    } else {
        return stage.c<typeof List>({
            type: List,
            itemConstruct: Actor,
            items: model.items
        });
    }
};

export const details = (data: DetailsData) => {
    return new Details(data);
};

export const people = (data: PeopleData) => {
    return new People(data);
};