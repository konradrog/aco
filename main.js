
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

function createRoutes(city, i) {
    for (idx = 0; i < citiesList.length; i++) {
        routesList[i + idx] = new Route(city, citiesList[idx]);
    }
}

citiesList.forEach(createRoutes);