import {Item, FlipList, Actor, List} from "../components";
import {Container, Details, Cast, People} from "./models";

let stage;
const models = new Map();
const listComponents = new Map();
const itemComponents = new Map();

models.set("movie", Container);
models.set("tv", Container);
models.set("cast", Cast);

listComponents.set("movie", FlipList);
listComponents.set("tv", FlipList);
listComponents.set("cast", List);

itemComponents.set("movie", Item);
itemComponents.set("tv", Item);
itemComponents.set("cast", Actor);

export const init = (stageInstance) =>{
    stage = stageInstance;
};

export const list = (type, data, genres) => {
    const container = models.get(type);
    const model = new container(data, type, genres);

    return stage.c({
        type: listComponents.get(type),
        itemConstruct: itemComponents.get(type),
        items: model.items
    });
};

export const details = (data) => {
    return new Details(data);
};

export const people = (data) => {
    return new People(data);
};