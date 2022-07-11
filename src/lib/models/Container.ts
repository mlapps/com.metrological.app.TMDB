import {ModelType, Movie, Tv} from ".";
import { Genre } from "../types";

export interface ContainerData {
    page: any;
    total_results: any;
    type: any;
    items: any;

    results: any[];
}

export default class Container {
    _page: any;
    _total_results: any;
    _type: any;
    _items: any;

    constructor(obj: ContainerData, type: 'movie' | 'tv', genres: Genre[]){
        this._page = obj.page;
        this._total_results = obj.total_results;
        this._type = type;
        this._items = obj.results.map(item => {
            switch (type) {
                case "movie":
                    return new Movie(item, genres);
                case "tv":
                    return new Tv(item, genres);
            }
        });
    }

    get page() {
        return this._page;
    }

    get total() {
        return this._total_results;
    }

    get type() {
        return this._type;
    }

    get items() {
        return this._items;
    }
}