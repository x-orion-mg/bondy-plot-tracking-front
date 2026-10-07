import { useRef, useEffect, useState } from 'react';
import mapboxgl, { LngLatLike, Map as MapType, Marker } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FeatureCollection, Feature } from 'geojson'; // Point,
import getGeoData from '../utils/getGeoData';
import { createRoot } from 'react-dom/client';
import StaticMarker from '../components/StaticMarker/StaticMarker';
import StaticRedMarker from "../components/StaticRedMarker/StaticRedMarker.tsx";
import TreeMarker from '../components/TreeMarker/TreeMarker.tsx';

const INITIAL_CENTER: LngLatLike = [46.8691, -18.7669];
const INITIAL_ZOOM = 5;

export function useMapbox() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapType | null>(null);
  const markerRef = useRef<Marker[]>([]);
  const hoveredPolygonId = useRef<string | number | null>(null);
  const url = '/geojson/geoBoundaries-MDG-ADM1.min.geojson';
  const [geoData, setGeoData] = useState<FeatureCollection | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  const hoveredParcelleId = useRef<string | number | null>(null);
  const hoverEventsEnabled = useRef(false);

  const [, setForceUpdate] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const geoData = await getGeoData(url);
      if (geoData) {
        setGeoData(geoData);
      } else {
        console.error('Aucune donnée disponible.');
      }
    };

    loadData();
  }, [url]);


  useEffect(() => {
    if (!geoData) return;

    const checkContainer = setInterval(() => {
      if (mapContainerRef.current) {
        clearInterval(checkContainer);

        mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current!,
          style: 'mapbox://styles/mapbox/satellite-v9',
          projection: 'globe',
          zoom: INITIAL_ZOOM,
          center: INITIAL_CENTER,
        });

        setIsMapInitialized(true);

        mapRef.current.on('load', () => {
          if (!mapRef.current?.getSource('madagascar')) {
            mapRef.current?.addSource('madagascar', {
              type: 'geojson',
              data: geoData,
              promoteId: 'shapeID',
            });

            mapRef.current?.addLayer({
              id: 'madagascar-line',
              type: 'line',
              source: 'madagascar',
              paint: {
                'line-color': 'white',
                'line-width': 1,
              },
            });

            mapRef.current?.addLayer({
              id: 'madagascar-fill',
              type: 'fill',
              source: 'madagascar',
              paint: {
                'fill-color': '#EDCC45',
                'fill-opacity': [
                  'case',
                  ['boolean', ['feature-state', 'hover'], false],
                  0.3,
                  0
                ]
              }
            });
          }
        });

        // Ajout du control de navigation zoom en bas à droite
        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        mapRef.current.doubleClickZoom.disable();

        // Gestion du redimensionnement
        let resizeTimeout: number | undefined;
        const debouncedResize = () => {
          clearTimeout(resizeTimeout);
          resizeTimeout = setTimeout(() => {
            mapRef.current?.resize();
          }, 200);
        };

        const resizeObserver = new ResizeObserver(debouncedResize);
        resizeObserver.observe(mapContainerRef.current!);

        return () => {
          resizeObserver.disconnect();
          clearTimeout(resizeTimeout);
          mapRef.current?.remove();
        };
      }
    }, 100); // Vérifie toutes les 100ms

    return () => clearInterval(checkContainer);
  }, [geoData]);



  const onMouseMove = (e: mapboxgl.MapMouseEvent & { features?: Feature[] }) => {
    if (e.features && e.features.length > 0) {

      if (hoveredPolygonId.current !== null) {
        mapRef.current!.setFeatureState(
          { source: 'madagascar', id: hoveredPolygonId.current },
          { hover: false }
        );
      }
      hoveredPolygonId.current = e.features[0].id as string | number;
      mapRef.current!.setFeatureState(
        { source: 'madagascar', id: hoveredPolygonId.current },
        { hover: true }
      );
    }
  };

  const onMouseLeave = () => {
    if (hoveredPolygonId.current !== null) {
      mapRef.current!.setFeatureState(
        { source: 'madagascar', id: hoveredPolygonId.current },
        { hover: false }
      );
    }
    hoveredPolygonId.current = null;
  };

  function enableHoverEvents() {
    if (mapRef.current && !hoverEventsEnabled.current) {
      mapRef.current.on('mousemove', 'madagascar-fill', onMouseMove);
      mapRef.current.on('mouseleave', 'madagascar-fill', onMouseLeave);
      hoverEventsEnabled.current = true;
    }
  }

  function disableHoverEvents() {
    if (mapRef.current && hoverEventsEnabled.current) {
      mapRef.current.off('mousemove', 'madagascar-fill', onMouseMove);
      mapRef.current.off('mouseleave', 'madagascar-fill', onMouseLeave);
      hoverEventsEnabled.current = false;
    }
  }

  function hoverPolygonById(polygonId: string | number) {
    if (mapRef.current && polygonId !== hoveredPolygonId.current) {
      if (hoveredPolygonId.current !== null) {
        mapRef.current.setFeatureState(
          { source: 'madagascar', id: hoveredPolygonId.current },
          { hover: false }
        );
      }
      hoveredPolygonId.current = polygonId;

      if (mapRef.current.getSource('madagascar')) {
        mapRef.current.setFeatureState(
          { source: 'madagascar', id: hoveredPolygonId.current },
          { hover: true }
        );
      }

    }
  }

  function unhoverPolygonById(polygonId: string | number) {
    if (mapRef.current && polygonId === hoveredPolygonId.current) {
      if (mapRef.current.getSource('madagascar')) {
        mapRef.current.setFeatureState(
          { source: 'madagascar', id: hoveredPolygonId.current },
          { hover: false }
        );
      }
      hoveredPolygonId.current = null;
    }
  }

  function addMarkers(data: number[], text: string = ''): Marker | null {
    if (!mapRef.current || !mapContainerRef.current) return null
    const markerElement = document.createElement('div');
    const root = createRoot(markerElement);
    root.render(<StaticMarker text={text} />);

    if (mapRef.current && mapContainerRef.current && markerElement) {
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat({
          lng: data[0],
          lat: data[1],
        })
        .addTo(mapRef.current!);

      markerRef.current.push(marker);
      return marker;
    }

    return null;
  }

  function addRedMarkers(data: number[], icon: string): Marker | null {
    const redMarkerElement = document.createElement('div');
    const root = createRoot(redMarkerElement);
    root.render(<StaticRedMarker icon={icon} />);

    if (mapRef.current && mapContainerRef.current) {
      const marker = new mapboxgl.Marker(redMarkerElement)
        .setLngLat({
          lng: data[0],
          lat: data[1],
        })
        .addTo(mapRef.current!);

      markerRef.current.push(marker);
      return marker;
    }

    return null;
  }


  function addTreeMarkers(data: number[], icon: string = ''): Marker | null {
    const treeMarkerElement = document.createElement('div');
    const root = createRoot(treeMarkerElement);
    root.render(<TreeMarker icon={icon} />);

    if (mapRef.current && mapContainerRef.current && treeMarkerElement) {
      const marker = new mapboxgl.Marker(treeMarkerElement)
        .setLngLat({
          lng: data[0],
          lat: data[1],
        })
        .addTo(mapRef.current!);

      markerRef.current.push(marker);
      return marker;
    }

    return null;
  }

  function removeAllMarkers() {
    if (mapRef.current) {
      markerRef.current.forEach((marker) => marker.remove());
      markerRef.current = [];
    }
  }

  function fitBoundsToPolygon(bounds: number[][]) {
    if (mapRef.current) {
      const lngLatBounds = new mapboxgl.LngLatBounds(
        new mapboxgl.LngLat(bounds[0][0], bounds[0][1]), // Coin sud-ouest
        new mapboxgl.LngLat(bounds[1][0], bounds[1][1])  // Coin nord-est
      );

      // Appliquez fitBounds sur la carte avec les limites fournies
      mapRef.current.fitBounds(lngLatBounds, {
        padding: { top: 10, bottom: 10, left: 10, right: 10 },
        maxZoom: 8,
      });
    } else {
      return;
    }
  }

  function addParcellesToMap(geojsonArray: GeoJSON.Feature<GeoJSON.Polygon>[]) {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Si la source existe déjà, on met à jour la collection de polygones
    if (!mapRef.current?.getSource('parcelles')) {
      mapRef.current?.addSource('parcelles', {
        type: 'geojson',
        data: {
          type: "FeatureCollection",
          features: geojsonArray
        }
      });

    } else {
      const source = map.getSource('parcelles') as mapboxgl.GeoJSONSource;

      source.setData({
        type: "FeatureCollection",
        features: geojsonArray,
      });
    }

    const borderLayerId = "parcelles-border";
    const fillLayerId = "parcelles-fill";

    if (!map.getLayer(borderLayerId)) {
      map.addLayer({
        id: borderLayerId,
        type: "line",
        source: 'parcelles',
        paint: {
          "line-color": "#39E890",
          "line-width": 2,
        },
      });
    }

    if (!map.getLayer(fillLayerId)) {
      map.addLayer({
        id: fillLayerId,
        type: 'fill',
        source: 'parcelles',
        paint: {
          'fill-color': '#39E890',
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            0.5, // Opacité quand survolé
            0.0  // Opacité sinon
          ]
        }
      });
    }

  }


  // remove polygon
  function removeParcellesToMap(sourceId: string) {
    if (!mapRef.current || !mapRef.current.isStyleLoaded()) {
      return;
    }

    const map = mapRef.current;

    // Si la source existe déjà, on met à jour la collection de polygones
    if (mapRef.current?.getSource('parcelles')) {

      const source = map.getSource(`${sourceId}`) as mapboxgl.GeoJSONSource;

      if (source) {
        source.setData({
          type: "FeatureCollection",
          features: [],
        })

        const borderLayerId = "parcelles-border";
        const fillLayerId = "parcelles-fill";

        if (map.getLayer(borderLayerId)) {
          map.removeLayer(`${borderLayerId}`);
        }

        if (map.getLayer(fillLayerId)) {
          map.removeLayer(fillLayerId)
        }
      }
    }
  }


  /*Hover parcelles fonction*/


  function hoverParcelleById(parcelleId: string | number) {
    if (mapRef.current && parcelleId !== hoveredParcelleId.current) {
      if (hoveredParcelleId.current !== null) {
        mapRef.current.setFeatureState(
          { source: 'parcelles', id: hoveredParcelleId.current },
          { hover: false }
        );
      }
      hoveredParcelleId.current = parcelleId;
      mapRef.current.setFeatureState(
        { source: 'parcelles', id: hoveredParcelleId.current },
        { hover: true }
      );
    }
  }

  function unhoverParcelleById(parcelleId: string | number) {
    if (mapRef.current && parcelleId === hoveredParcelleId.current) {
      mapRef.current.setFeatureState(
        { source: 'parcelles', id: hoveredParcelleId.current },
        { hover: false }
      );
      hoveredParcelleId.current = null;
    }
  }


  // Fonction `onMouseMove` pour la source 'parcelles'
  const onParcelleMouseMove = (e: mapboxgl.MapMouseEvent & { features?: Feature[] }) => {
    if (!mapRef.current) return

    mapRef.current.getCanvas().style.cursor = 'pointer';

    if (e.features && e.features.length > 0) {
      // Si une parcelle est déjà survolée, on désactive son état 'hover'
      if (hoveredParcelleId.current !== null && typeof hoveredParcelleId.current === "number") {
        mapRef.current!.setFeatureState(
          { source: 'parcelles', id: hoveredParcelleId.current },
          { hover: false }
        );
      }

      // Identifier la nouvelle parcelle survolée
      hoveredParcelleId.current = e.features[0].id as string | number;

      // Activer l'état 'hover' pour la parcelle survolée
      if (hoveredParcelleId.current !== null && typeof hoveredParcelleId.current === "number") {
        mapRef.current.setFeatureState(
          { source: 'parcelles', id: hoveredParcelleId.current },
          { hover: true }
        );
      }

      // Réactiver l'opacité uniquement pour la parcelle survolée
      mapRef.current.setPaintProperty('parcelles-fill', 'fill-opacity', [
        'case',
        ['boolean', ['feature-state', 'hover'], false], // Si ce n'est pas survolé, opacité 0
        0.5, // L'opacité de la parcelle survolée (ajuste à ta convenance)
        0 // L'opacité des autres parcelles
      ]);
    }

    setForceUpdate((prev) => prev + 1);
  };


  // 2. Fonction `onMouseLeave` pour réinitialiser l'état de survol des parcelles
  const onParcelleMouseLeave = () => {
    if (!mapRef.current) return;

    mapRef.current.getCanvas().style.cursor = 'drag';

    if (hoveredParcelleId.current !== null && typeof hoveredParcelleId.current === "number") {
      // Désactiver l'état 'hover' de la parcelle survolée
      mapRef.current.setFeatureState(
        { source: 'parcelles', id: hoveredParcelleId.current },
        { hover: false }
      );
      // Réinitialiser l'ID de la parcelle survolée
      hoveredParcelleId.current = null;
    }

    setForceUpdate((prev) => prev - 1);
  };



  // 3. Fonction `activateParcelleEvents` pour activer les événements de survol pour la source 'parcelles'
  function activateParcelleEvents() {
    if (mapRef.current) {
      // Ajouter l'événement 'mousemove' pour gérer le survol des parcelles
      mapRef.current.on('mousemove', 'parcelles-fill', onParcelleMouseMove);
      // Ajouter l'événement 'mouseleave' pour gérer la sortie du survol des parcelles
      mapRef.current.on('mouseleave', 'parcelles-fill', onParcelleMouseLeave);
    }
  }


  // 4. Fonction `deactivateParcelleEvents` pour désactiver les événements de survol pour la source 'parcelles'
  function deactivateParcelleEvents() {
    if (mapRef.current) {
      // Retirer l'événement 'mousemove'
      mapRef.current.off('mousemove', 'parcelles-fill', onParcelleMouseMove);
      // Retirer l'événement 'mouseleave'
      mapRef.current.off('mouseleave', 'parcelles-fill', onParcelleMouseLeave);
    }
  }

  /*Hover parcelles fonction*/


  function resetView() {
    if (mapRef.current) {
      mapRef.current.flyTo({
        zoom: INITIAL_ZOOM,
        center: INITIAL_CENTER,
        speed: 2,
        curve: 1,
        pitch: 0,
      });
    } else {
      return;
    }
  }


  function addLayerImage(url: string, coordinates: [[number, number], [number, number], [number, number], [number, number]]) {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const sourceId = 'image-source';
    const layerId = 'image-layer';

    // Vérifier si la source existe déjà et la supprimer si nécessaire
    if (map.getSource(sourceId)) {
      map.removeLayer(layerId);
      map.removeSource(sourceId);
    }

    // Ajouter la nouvelle source d'image
    map.addSource(sourceId, {
      type: 'image',
      url: url,
      coordinates: coordinates

      // [
      //   [
      //     48.20183512105589,
      //     -15.382186331624368
      //   ],
      //   [
      //     48.227871489608646,
      //     -15.382186331624368
      //   ],
      //   [
      //     48.227871489608646,
      //     -15.404212062688885
      //   ],
      //   [
      //     48.20183512105589,
      //     -15.404212062688885
      //   ]
      // ]
    });

    // Ajouter un layer pour afficher l'image
    map.addLayer({
      id: layerId,
      type: 'raster',
      source: sourceId,
      paint: {
        'raster-fade-duration': 0
      }
    });
  }


  function showDroneImage(url: string, bounds: [number, number, number, number]) {
    if (!mapRef.current) return;

    const map = mapRef.current;

    map.addSource('drone-image', {
      type: 'raster',
      tiles: [url],
      tileSize: 256,
      minzoom: 12,
      maxzoom: 20,
      scheme: 'tms',
      bounds: bounds
    });

    map.addLayer({
      id: 'drone-image-layer',
      type: 'raster',
      source: 'drone-image',
      paint: {
        'raster-opacity': 1
      }
    });


    map.addSource('drone-image-outline', {
      type: 'geojson',
      data: {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Polygon',
          coordinates: [[
            [
              48.9998304,
              -19.0469481
            ],
            [
              48.9997544,
              -19.0532846
            ],
            [
              49.0019851,
              -19.0533087
            ],
            [
              49.0020609,
              -19.0469723
            ],
            [
              48.9998304,
              -19.0469481
            ]
          ]]
        }
      }
    });

    map.addLayer({
      id: 'drone-image-border',
      type: 'line',
      source: 'drone-image-outline',
      paint: {
        'line-color': '#33ff00',
        'line-width': 5
      }
    });

  }

  function hideDroneImage() {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (map.getLayer('drone-image-layer')) map.removeLayer('drone-image-layer');
    if (map.getSource('drone-image')) map.removeSource('drone-image');

    if (map.getLayer('drone-image-border')) map.removeLayer('drone-image-border');
    if (map.getSource('drone-image-outline')) map.removeSource('drone-image-outline');
  }



  return {
    mapContainerRef,
    enableHoverEvents,
    disableHoverEvents,
    isMapInitialized,
    addMarkers,
    addRedMarkers,
    addTreeMarkers,
    removeAllMarkers,
    mapRef,
    fitBoundsToPolygon,
    hoverPolygonById,
    unhoverPolygonById,
    activateParcelleEvents,
    deactivateParcelleEvents,
    removeParcellesToMap,
    addParcellesToMap,
    hoverParcelleById,
    unhoverParcelleById,
    resetView,
    hoveredParcelleId,
    addLayerImage,
    showDroneImage,
    hideDroneImage
  };
}
