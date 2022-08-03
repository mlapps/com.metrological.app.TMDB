import { MovieModel, TvModel } from ".";
import { EntityData, Genre } from "../types";
import { MovieData } from "./MovieModel";
import { TvData } from "./TvModel";

export interface ContainerData {
    page?: number;
    total_results?: number;
    total_pages?: number;
    results: EntityData[];
}

export default class ContainerModel {
    _page: number;
    _total_results: number;
    _type: 'movie' | 'tv';
    _items: Array<MovieModel | TvModel>;

    constructor(obj: ContainerData, type: 'movie' | 'tv', genres: Genre[]) {
        this._page = obj.page || 1;
        this._total_results = obj.total_results || obj.results.length;
        this._type = type;
        this._items = obj.results.map(item => {
            switch (type) {
                case "movie":
                    return new MovieModel(item as MovieData, genres);
                case "tv":
                    return new TvModel(item as TvData, genres);
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