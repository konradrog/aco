class Ant {
    constructor() {
        this._capacity = 1000;
        this._track = [];
        this._leftCapacity =   function() {
            if (this._track.length > 0) {
                return (this.capacity - this.track.map(
                    function(route) {
                        return parseInt(route.end.capacity);
                    }).reduce((a,b) => a + b))
            } else {
                return this._capacity;
            }
        };
    }

    addRoute(route) {
        this._track.push(route);
        route.use();
    }

    get capacity() {
        return this._capacity;
    }

    get track() {
        return this._track;
    }
 
    get leftCapacity() {
        return this._leftCapacity;
    }
}