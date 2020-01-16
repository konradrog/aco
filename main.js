 let citiesData = cities.split(',');
 let citiesList = new Array();

 function createCity(city, i) {
     rawCityData = city.split(' ');
     citiesList[i] = new City(
        rawCityData[0], 
        rawCityData[2], 
        rawCityData[3],
        rawCityData[1]
     );
 };

citiesData.forEach(createCity);


let routesList = new Array();
let citiesNumber = citiesList.length

function createRoutes(city, i) {
    for (idx = 0; idx < citiesNumber; idx++) {
        routesList[(i*citiesNumber) + idx] = new Route(city, citiesList[idx]);
    }
}

citiesList.forEach(createRoutes);

function findDepo(routes) {
    return routes.filter(route => {
        return (route.start.name == 'Kraków' && route.end.name == 'Kraków')
    })
}

let depo = findDepo(routesList);

let antsNumber = 5;
let antsList = new Array;

function createAnts() {
    for (i = 0; i < antsNumber; i++) {
        antsList[i] = new Ant();
        antsList[i].addRoute(depo[0]);
    }
}

function findRouteToDepo(lastCity) {
    return routesList.filter(route => {
        return (route.start.name == lastCity.name && route.end.name == 'Kraków')
    })
}


createAnts();

function rand(min, max) {
    return Math.random() * (max - min) + min;
};


function getRandomItem(list, weight) {
    let total_weight = weight.reduce(function (prev, cur) {
        return prev + cur;
    });

    let randomNum = rand(0,1);
    let weightSum = 0;
    let result = 0;

    for (let i = 0; i < list.length; i++) {
        weightSum += weight[i];
        weightSum = +weightSum.toFixed(2);

        if (randomNum <= weightSum) {
            return result = list[i];
        } else if ( (result == 0) && (i == list.length - 1)) {
            return result = list[i]
        }
    }

    if (result == 0) {
        debugger;
    }
    return result;
};

function findOptimalRoute(ant) {
    let lastRoute = ant.track[ant.track.length - 1];
    let lastCity = lastRoute.end;
    
    possibleRoutes = routesList.filter(route => {
        if (
                (route.used == false) && 
                (route.start == lastCity) && 
                (route.end != lastCity) && 
                (route.end.visited == false) &&
                (route.start != route.end) &&
                (route.end.name != 'Kraków')
            ) {
            if (ant.leftCapacity() >= route.end.capacity) {
                return route;
            } 
        }
    });

    if (possibleRoutes.length != 0) {
        let propablilities = possibleRoutes.map(
            function(route) { 
                return route.probability 
        });

        let sumOfProbabilities = propablilities.reduce((a,b) => a + b)

        let normalizedProbabilities = propablilities.map(
            function(prob) {
                return prob/sumOfProbabilities;
            }
        )

        let shortestRoute = getRandomItem(possibleRoutes, normalizedProbabilities)

        ant.addRoute(shortestRoute);
        shortestRoute.end.name != 'Kraków' ? shortestRoute.end.visit() : ''
        return findOptimalRoute(ant);
    } else {
        let routeToDepo = findRouteToDepo(lastCity);
        return ant.addRoute(routeToDepo[0]);
    }
    
}

let numberOfIteration = 10;
let evaporationParam = 0.06;
let bestResult = new Array;

for (i = 0; i < numberOfIteration; i++) {
    antsList.forEach (
        function(ant) {
            findOptimalRoute(ant);
            ant.leavePheromones();
    });
    bestRouteLength = antsList.map(
        function(ant) {
            return parseInt(ant.trackLength())
        }
    ).reduce((a,b) => a + b)

    bestResult.push(bestRouteLength);

    routesList.forEach( function (route) {
        route.evaporatePhero(evaporationParam);
        route.removeUsedMarker();
    })
    antsList.forEach ( 
        function(ant) { 
            ant.resetTrack(depo[0]);
    })
}
    
console.log('Best Results : ' + bestResult.sort())

