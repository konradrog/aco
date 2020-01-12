class Ant {
    constructor() {
        this._capacity = 1000;
        this._track = [];
    }

    addRoute(route) {
        this._track.push(route);
        route.use();
    }

    get capacity(){
        return this._capacity;
    }

    get track() {
        return this._track;
    }
}