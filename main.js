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


createAnts();

let first_ant = antsList[0];

function findOptimalRoute(ant) {
    let lastRoute = ant.track.pop();
    let lastCity = lastRoute.end;
    
    possibleRoutes = routesList.filter(route => {
    // return routesList.filter(route => {
        if ((route.used == false) && route.start == lastCity) {
            if (ant.leftCapacity <= route.end.capacity) {
                return route;
            } // else {
            // wróć do depo weź kolejną mrówkę
            //}
        }
    });

    let closestCity = possibleRoutes.reduce(
        (a, b) => a.distance < b.distance ? a : b
    )
    return ant.addRoute(closestCity);
}

findOptimalRoute(first_ant);
