class Result {
    constructor(ants) {
        this.ants = ants;
    }

    get shortestRoute() {
        debugger;
        return this.antsList.map(
            function(ant) {
                return parseInt(ant.trackLength())
            }
        ).reduce((a,b) => a + b)
    }

    print() {
        console.log('Shortest Route: ' + this.shortestRoute);
    }
}

