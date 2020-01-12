class Route {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this._used = false;
    }

    get distance() {
        return this.calculateDistance();
    }

    calculateDistance() {
        return Math.sqrt(Math.pow((this.end.xx - this.start.xx),2) + Math.pow((this.end.yy - this.start.yy),2))
    }

    get used() {
        return this._used;
    }

    use() {
        this._used = true;
    }
}
