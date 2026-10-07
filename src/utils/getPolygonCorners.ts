import { Feature, Polygon } from "geojson";

type Coordinates = [number, number];

export function getPolygonCorners(geojson: Feature<Polygon>): Coordinates[] {
    if (!geojson.geometry || geojson.geometry.type !== "Polygon") {
        throw new Error("Le GeoJSON doit être un polygone.");
    }

    const coordinates = geojson.geometry.coordinates[0]; // Premier anneau du polygone

    let minLng = Infinity, maxLng = -Infinity;
    let minLat = Infinity, maxLat = -Infinity;

    coordinates.forEach(([lng, lat]) => {
        if (lng < minLng) minLng = lng;
        if (lng > maxLng) maxLng = lng;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
    });

    return [
        [minLng, maxLat], // Haut gauche
        [maxLng, maxLat], // Haut droit
        [maxLng, minLat], // Bas droit
        [minLng, minLat]  // Bas gauche
    ];
}