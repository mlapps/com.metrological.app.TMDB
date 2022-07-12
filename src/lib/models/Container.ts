import { Movie, Tv } from ".";
import { EntityData, Genre } from "../types";
import { MovieData } from "./Movie";
import { TvData } from "./Tv";

export interface ContainerData {
    page?: number;
    total_results?: number;
    total_pages?: number;

    type?: string;
    items?: any;
    results: EntityData[];
}

export default class Container {
    _page: any;
    _total_results: number;
    _type: 'movie' | 'tv';
    _items: Array<Movie | Tv>;

    constructor(obj: ContainerData, type: 'movie' | 'tv', genres: Genre[]) {
        this._page = obj.page;
        this._total_results = obj.total_results || 0;
        this._type = type;
        this._items = obj.results.map(item => {
            switch (type) {
                case "movie":
                    return new Movie(item as MovieData, genres);
                case "tv":
                    return new Tv(item as TvData, genres);
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