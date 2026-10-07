import './HomeNav.scss';
import { useContext, useEffect } from 'react';
import mapboxgl, { MapMouseEvent } from 'mapbox-gl';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapboxContext } from '../../providers/mapbox/MapboxProvider';
import RegionFilter from '../../components/RegionFilter/RegionFilter';
import useHomeNav from './useHomeNav.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import { ProjectParent } from '../../models/Project.model.ts';
import RegionCard from '../../components/RegionCard/RegionCard.tsx';
import { getCleanPath } from '../../utils/getCleanPath.ts';

export default function HomeNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(MapboxContext);
  const { isRegionLoading, regions, projectTypes, setTypeId } = useHomeNav()

  if (!context) {
    throw new Error('Home must be used within a MapboxProvider');
  }

  const { mapRef, isMapInitialized, resetView, enableHoverEvents } = context;

  useEffect(() => {

    resetView()
    enableHoverEvents();

    const mapInstance = mapRef.current;
    const handleMapClick = (event: MapMouseEvent) => {
      const clickedFeature = event.features?.[0];

      if (!clickedFeature) {
        return;
      }

      const shapeId = clickedFeature.properties?.shapeID;
      const region = regions?.data.find((region) => region.localisation.shapeId === shapeId);
      if (!region) {
        return;
      }

      const bounds = region.localisation.bounds;
      const lngLatBounds = new mapboxgl.LngLatBounds(
        new mapboxgl.LngLat(bounds[0][0], bounds[0][1]),
        new mapboxgl.LngLat(bounds[1][0], bounds[1][1])
      );

      mapRef.current?.fitBounds(lngLatBounds, {
        padding: { top: 10, bottom: 10, left: 10, right: 10 },
        maxZoom: 8,
      });

      navigate(`${getCleanPath(location.pathname)}/parents/${region.id}`);

    };


    if (isMapInitialized && mapRef.current) {
      mapRef.current?.on('click', 'madagascar-fill', handleMapClick);
    }

    return () => {
      if (mapInstance) {
        mapInstance.off('click', 'madagascar-fill', handleMapClick);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapInitialized, mapRef, navigate, regions, resetView]);

  return (
    <div className="regionsList">
      {projectTypes && projectTypes.data && <RegionFilter filters={projectTypes!.data!} setFilter={setTypeId} />}

      {isRegionLoading ? <div><Loader /></div> : regions?.data.map((region: ProjectParent) => (
        <RegionCard key={region.localisation.shapeId} region={region} />
      ))}

    </div>
  )
}
