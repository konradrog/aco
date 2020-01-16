function distanceInKm(latitudeGeo1, latitudeGeo2, longitudeGeo1, longitudeGeo2) {

    latitudeRad1 = toRadians(latitudeGeo1);
    latitudeRad2 = toRadians(latitudeGeo2);

    longitudeDelta = toRadians(longitudeGeo2 - longitudeGeo1);
    latitudeDelta = toRadians(latitudeGeo2 - latitudeGeo1);

    a = Math.sin(latitudeDelta / 2) * Math.sin(latitudeDelta / 2) + Math.cos(latitudeRad1) * Math.cos(latitudeRad2) * Math.sin(longitudeDelta / 2) * Math.sin(longitudeDelta / 2);
    cc = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return 6371 * cc;
}

function toRadians(degrees) {
    let pi = Math.PI;
    return degrees * (pi/180);
}


//latitude - szerokosc - 50