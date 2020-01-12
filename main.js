
 let citiesData = cities2.split(','); //jedno miasto za dużo, puste
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

let ant = antsList[0];

function findOptimalRoute(ant) {
    let lastRoute = ant.track.pop();
    let lastCity = lastRoute.end;
    
    return routesList.filter(route => {
        if ((route.used == false) && route.start == lastCity) {
            return route
        }
    });
    // ant.addRoute(route);
}

let possibleRoutes = findOptimalRoute(ant);
