 let citiesData = cities2.split(',');
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

let first_ant = antsList[0];

function findOptimalRoute(ant) {
    let lastRoute = ant.track[ant.track.length - 1];
    let lastCity = lastRoute.end;
    
    possibleRoutes = routesList.filter(route => {
        if ((route.used == false) && route.start == lastCity && route.end != lastCity) {
            if (ant.leftCapacity() >= route.end.capacity) {
                return route;
            } 
        }
    });


    if (possibleRoutes.length != 0) {
        let closestCity = possibleRoutes.reduce(
            (a, b) => a.distance < b.distance ? a : b
        )
        ant.addRoute(closestCity);
        return findOptimalRoute(ant);
    } else {
        let routeToDepo = findRouteToDepo(lastCity);
        return ant.addRoute(routeToDepo[0]);
    }
    
}

findOptimalRoute(first_ant);
