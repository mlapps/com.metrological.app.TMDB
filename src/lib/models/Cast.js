export default class Cast {
    constructor(obj, type){
        this._cast = obj.cast;
        this._crew = obj.crew;
        this._id = obj.id;
        this._type = type;
    }

    get items() {
        return this._cast;
    }

    get type() {
        return this._type;
    }

    get cast() {
        return this._cast;
    }

    get crew() {
        return this._crew;
    }

    get id() {
        return this._id;
    }
}