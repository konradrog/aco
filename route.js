class Route {
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this._used = false;
        this._phero = 0;
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

    get phero() {
        return this._phero;
    }

    addPhero(amount) {
        this._phero += amount;
    }

    evaporatePhero(evoParam) {
        let phero = this._phero - evoParam;
        if (phero < 0) {
            return 0;
        } else {
            return phero;
        }
    }

    removeUsedMarker() {
        this._used = false;
    }
}
