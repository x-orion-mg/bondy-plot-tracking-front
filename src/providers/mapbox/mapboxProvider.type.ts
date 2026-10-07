// mapboxProvider.type.ts
import { ReactNode, RefObject } from 'react';
import { Marker, Map as MapType } from 'mapbox-gl';

export interface MapboxContextType {
  enableHoverEvents: () => void;
  disableHoverEvents: () => void;
  addMarkers: (data: number[], text?: string) => Marker | null;
  addRedMarkers: (data: number[], icon: string) => Marker | null;
  addTreeMarkers: (data: number[], icon: string) => Marker | null;
  removeAllMarkers: () => void;
  fitBoundsToPolygon: (bounds: number[][]) => void;
  hoverPolygonById: (polygonId: string | number) => void;
  unhoverPolygonById: (polygonId: string | number) => void;
  addParcellesToMap: (geojsonArray: GeoJSON.Feature<GeoJSON.Polygon>[]) => void;
  removeParcellesToMap: (sources: string) => void;
  resetView: () => void;
  activateParcelleEvents: () => void;
  deactivateParcelleEvents: () => void;
  hoverParcelleById: (parcelleId: string | number) => void;
  unhoverParcelleById: (parcelleId: string | number) => void;
  mapRef: RefObject<MapType>;
  mapContainerRef: RefObject<HTMLDivElement>;
  isMapInitialized: boolean;
  hoveredParcelleId: RefObject<string | number>;
  addLayerImage: (url: string, coordinates: [[number, number], [number, number], [number, number], [number, number]]) => void,
  showDroneImage: (url: string, bounds: [number, number, number, number]) => void,
  hideDroneImage: () => void
}

export interface MapboxProviderProps {
  children: ReactNode;
}
