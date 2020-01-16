class City {
    constructor(name, x, y, capacity) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.capacity = capacity;
        this._visited = false;
    }

    get xx() {
        return this.x;
    }

    get yy() {
        return this.y;
    }

    get visited() {
        return this._visited;
    }

    visit() {
        this._visited = true;
    };

    resetVisited() {
        this._visited = false;
    }
}