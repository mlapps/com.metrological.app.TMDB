import { Lightning } from "@lightningjs/sdk";
import {Item, FlipList, Actor, List} from "../components";
import {Container, Details, Cast, People, ModelType} from "./models";
import { CastData } from "./models/Cast";
import { ContainerData } from "./models/Container";
import { DetailsData } from "./models/Details";
import { PeopleData } from "./models/People";
import { CreditsResponse, Genre, SimilarResponse } from "./types";


let stage: Lightning.Stage;
const models = new Map<ModelType, typeof Container | typeof Cast>();
const listComponents = new Map<ModelType, (typeof FlipList<typeof Item>) | (typeof List<typeof Actor>)>();
const itemComponents = new Map<ModelType, typeof Item | typeof Actor>();

models.set("movie", Container);
models.set("tv", Container);
models.set("cast", Cast);

listComponents.set("movie", FlipList);
listComponents.set("tv", FlipList);
listComponents.set("cast", List);

itemComponents.set("movie", Item);
itemComponents.set("tv", Item);
itemComponents.set("cast", Actor);

export const init = (stageInstance: Lightning.Stage) =>{
    stage = stageInstance;
};

export const list = (type: string, data: ContainerData | CastData | CreditsResponse | SimilarResponse | PeopleData, genres?: Genre[]): Lightning.Component | null => {
    if (type !== 'movie' && type !== 'tv' && type !== 'cast') {
        return null;
    }
    const container = models.get(type);
    if (!container) return null;
    let model: Container | Cast | undefined;
    if (container === Container && (type === 'movie' || type === 'tv') && genres) {
        model = new container(data as ContainerData, type, genres);
    } else if (container === Cast && type === 'cast') {
        model = new container(data as CastData, type);
    }

    if (!model || model.items.length === 0) {
        return null;
    } else {
        const listConstruct = listComponents.get(type)!;
        return stage.c({
            type: listConstruct,
            itemConstruct: itemComponents.get(type),
            items: model.items // !!! Not type safe the way its written
        }) as Lightning.Component;
    }
};

export const details = (data: DetailsData) => {
    return new Details(data);
};

export const people = (data: PeopleData) => {
    return new People(data);
};