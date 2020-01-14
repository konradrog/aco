class Ant {
    constructor() {
        this._capacity = 1000;
        this._track = [];
        this._qParam = 1;
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

    get qParam() {
        return this._qParam;
    }
 
    get leftCapacity() {
        return this._leftCapacity;
    }

    trackLength() {
        return this.track.map(function(route) { return route.distance}).reduce((a,b) => a + b)
    }

    // mrówka zostawia na każdej drodze między miastami Q/długość całej drogi -> od depo do depo
    leavePheromones() {
        let param = this._qParam;
        let distance = this.trackLength()
        this.track.forEach( function(track) {
            return track.addPhero( param / distance )
        })
    }
}