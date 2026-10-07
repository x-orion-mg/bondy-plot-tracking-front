import './RegionCard.scss';
import Icon from '../Icomoon/Icomoon';
import { useContext, useEffect, useRef } from 'react';
import { MapboxContext } from '../../providers/mapbox/MapboxProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// @ts-expect-error ts(7016)
import mapboxgl from 'mapbox-gl';
import { ProjectParent } from '../../models/Project.model.ts';
import { getCleanPath } from '../../utils/getCleanPath.ts';

interface RegionCardProps {
  region: ProjectParent;
}

function RegionCard({ region }: RegionCardProps) {
  const context = useContext(MapboxContext);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  if (!context) {
    throw new Error('Home must be used within a MapboxProvider');
  }



  const { mapContainerRef, fitBoundsToPolygon, hoverPolygonById, unhoverPolygonById, addMarkers } = context

  const handleMouseEnter = () => {
    hoverPolygonById(region.localisation.shapeId);

    if (markerRef.current) {
      const markerElement = markerRef.current.getElement();
      markerElement.querySelector('.static-marker')?.classList.add('vibrate');
    }
  };

  const handleMouseLeave = () => {
    unhoverPolygonById(region.localisation.shapeId);

    if (markerRef.current) {
      const markerElement = markerRef.current.getElement();
      markerElement.querySelector('.static-marker')?.classList.remove('vibrate');
    }
  };


  const handleMarkerClick = () => {
    if (markerRef.current) {
      navigate(`${getCleanPath(location.pathname)}/parents/${region.id}`);
    }
  }

  useEffect(() => {
    const markers: mapboxgl.Marker[] = [];

    if (mapContainerRef.current) {
      const marker = addMarkers([Number(region.localisation.latitude), Number(region.localisation.longitude)]);

      marker?.getElement().addEventListener('click', handleMarkerClick)

      if (marker) {
        markers.push(marker);
        markerRef.current = marker;
      }
    }

    return () => {
      markers.forEach(marker => {
        marker.remove();
        marker.getElement().removeEventListener('click', handleMarkerClick);
      });
      if (markerRef.current) {
        markerRef.current.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region.localisation, addMarkers, mapContainerRef]);

  return (
    <Link to={`${getCleanPath(location.pathname)}/parents/${region.id}`} className="region-card"
      onClick={() => fitBoundsToPolygon(region.localisation.bounds)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="region-card-content">
        <picture className="region-card-img">
          <img src={region.bannerImage} alt={region.projectType.label} />
        </picture>
        <div className="region-card-details">
          <div className="region-card-project-type" style={{ background: region.projectType?.color }}>{region.projectType.label}</div>
          <div className="region-card-localisation">
            <figure className="icone">
              <Icon icon='earth' size={16.5} color='#666666' />
            </figure>
            <div className="region-card-text">
              <span>{region.localisation.country}</span>
              <span>Région {region.localisation.region}</span>
              <span>{region.city}</span>
            </div>
          </div>
          <div className="region-card-startData">
            <figure className="icone">
              <Icon icon='calendar' size={16.5} color='#666666' />
            </figure>
            <div className="region-card-text">
              <span>Début : </span>
              <span>{region.startDate}</span>
            </div>
          </div>
          <div className="region-card-status">
            <figure className="icone">
              <Icon icon='graph' size={16.5} color='#666666' />
            </figure>
            <div className="region-card-text">
              <span>{region.projectStatus?.label}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default RegionCard;