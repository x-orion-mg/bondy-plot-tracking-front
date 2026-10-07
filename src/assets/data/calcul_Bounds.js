const fs = require('fs');

function getBounds(coordinates) {
    let minLng = Infinity, minLat = Infinity, maxLng = -Infinity, maxLat = -Infinity;

    function traverse(coords) {
        if (Array.isArray(coords[0])) {
            coords.forEach(traverse);
        } else {
            const [lng, lat] = coords;
            if (lng < minLng) minLng = lng;
            if (lng > maxLng) maxLng = lng;
            if (lat < minLat) minLat = lat;
            if (lat > maxLat) maxLat = lat;
        }
    }

    traverse(coordinates);
    return [[minLng, minLat], [maxLng, maxLat]];
}

function processGeoJSON(filePath) {
    const geojson = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    const result = geojson.features.map(feature => {
        const shapeName = feature.properties.shapeName || feature.properties.name || "Unknown";
        const shapeID = feature.properties.shapeID || feature.properties.id || "Unknown";
        const bounds = getBounds(feature.geometry.coordinates);
        return {
            shapeName,
            shapeID,
            bounds
        };
    });

    console.log(JSON.stringify(result, null, 2));
}

const filePath = process.argv[2];
if (!filePath) {
    console.error('Usage: node script.js <geojson_file>');
    process.exit(1);
}

processGeoJSON(filePath);
