import {Item, Carousel, FlipList} from "../components";
import {Container, Details} from "./models";

let stage;
const listComponents = new Map();
const itemComponents = new Map();

listComponents.set("movie", FlipList);
listComponents.set("tv", FlipList);
itemComponents.set("movie", Item);
itemComponents.set("tv", Item);

export const init = (stageInstance) =>{
    stage = stageInstance;
};

export const list = (type, data, genres) => {
    const container = new Container(data, type, genres);

    return stage.c({
        type: listComponents.get(container.type),
        itemConstruct: itemComponents.get(container.type),
        items: container.items
    });
};

export const carousel = (type, data, genres) => {
    const container = new Container(data, type, genres);

    const len = container.items.length;
    const half = ~~(len / 2);
    const dividedSet = container.items.splice(half, len);
    container.items.unshift(...dividedSet);

    return stage.c({
        type: listComponents.get(container.type),
        itemConstruct: itemComponents.get(container.type),
        index: half,
        items: container.items
    });
};

export const details = (data) => {
    return new Details(data);
};