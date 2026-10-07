import { createContext } from 'react';
import { MapboxContextType, MapboxProviderProps } from './mapboxProvider.type';
import { useMapbox } from '../../hooks/useMapbox';

// eslint-disable-next-line react-refresh/only-export-components
export const MapboxContext = createContext<MapboxContextType | null>(null);

function MapboxProvider({ children }: MapboxProviderProps) {
  const {
    mapContainerRef,
    addMarkers,
    enableHoverEvents,
    disableHoverEvents,
    addRedMarkers,
    addTreeMarkers,
    removeAllMarkers,
    fitBoundsToPolygon,
    hoverPolygonById,
    unhoverPolygonById,
    addParcellesToMap,
    removeParcellesToMap,
    activateParcelleEvents,
    deactivateParcelleEvents,
    hoverParcelleById,
    unhoverParcelleById,
    resetView,
    mapRef,
    isMapInitialized,
    hoveredParcelleId,
    addLayerImage,
    showDroneImage,
    hideDroneImage
  } = useMapbox()

  return (
    <MapboxContext.Provider value={{
      addMarkers,
      addRedMarkers,
      enableHoverEvents,
      disableHoverEvents,
      addTreeMarkers,
      mapContainerRef,
      removeAllMarkers,
      fitBoundsToPolygon,
      hoverPolygonById,
      unhoverPolygonById,
      addParcellesToMap,
      removeParcellesToMap,
      activateParcelleEvents,
      deactivateParcelleEvents,
      hoverParcelleById,
      unhoverParcelleById,
      resetView,
      mapRef,
      isMapInitialized,
      hoveredParcelleId,
      addLayerImage,
      showDroneImage,
      hideDroneImage
    }}>
      {children}
    </MapboxContext.Provider>
  );
}

export default MapboxProvider;
