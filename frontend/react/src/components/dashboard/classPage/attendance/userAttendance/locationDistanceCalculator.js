function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Radius of Earth in meters
    const feetPerMeter = 3.28084; // Conversion factor for meters to feet

    // Convert degrees to radians
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    // Haversine formula
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in meters
    const distanceMeters = R * c;

    // Convert to feet
    const distanceFeet = distanceMeters * feetPerMeter;

    return distanceFeet;
}

function splitString(input) {
    // Split the string at the comma
    const [firstPart, secondPart] = input.split(',');

    // Trim any whitespace around the values
    return {
        lat: firstPart.trim(),
        lon: secondPart.trim()
    };
}

// Usage
export default function isWithinDistance(locationA, locationB, maxDistanceFeet) {
    if (maxDistanceFeet===0){
        return true;
    }
    const locA=splitString(locationA);
    const locB = splitString(locationB);

    const distance = haversineDistance(locA.lat, locA.lon, locB.lat, locB.lon);
    return distance <= maxDistanceFeet;
}