import BannerProject from '../../components/BannerProject/BannerProject';
import HistoryProject from '../../components/HistoryProjet/HistoryProjet';
import SousProject from '../../components/SousProject/SousProject';
import Gallery from '../../components/Galerie/Galerie';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ResetMap from '../../components/ResetMap/ResetMap.tsx';
import useDescriptionNav from './useDescriptionNav.tsx';
import Loader from '../../components/Loader/Loader.tsx';
import { useContext, useEffect, useRef } from 'react';
import { MapboxContext } from '../../providers/mapbox/MapboxProvider.tsx';
import { BackButton } from '../../components/BackButton/BackButton.tsx';
import { LocalisationType, ProjectStatus, ProjectType } from "../../models/Project.model.ts";
import { getCleanPath } from '../../utils/getCleanPath.ts';
import { AuthContext } from '../../providers/auth/AuthContext.tsx';

export default function Description() {
  const context = useContext(MapboxContext);
  const authContext = useContext(AuthContext);
  const { parentsId } = useParams();
  const { isProjectDescriptionLoading, projectDescription } = useDescriptionNav();
  const navigate = useNavigate();
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const location = useLocation();

  if (!context) {
    throw new Error('DescriptionNav must be used within a MapboxProvider');
  }

  const { mapContainerRef, fitBoundsToPolygon, addMarkers, disableHoverEvents } = context;


  const handleMarkerClick = () => {
    if (markerRef.current) {
      navigate(`${getCleanPath(location.pathname)}/partners/${authContext?.user?.id}`);
    }
  }

  useEffect(() => {
    const markers: mapboxgl.Marker[] = [];

    if (projectDescription) {
      fitBoundsToPolygon(projectDescription.data.localisation.bounds);

      if (mapContainerRef.current) {
        const marker = addMarkers([Number(projectDescription.data.localisation.latitude), Number(projectDescription.data.localisation.longitude)]);

        marker?.getElement().addEventListener('click', handleMarkerClick);

        if (marker) {
          markers.push(marker);
          markerRef.current = marker;
        }
      }

      disableHoverEvents();

      return () => {
        markers.forEach(marker => {
          marker.remove();
        });

        if (markerRef.current) {
          markerRef.current.remove();
        }
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectDescription, fitBoundsToPolygon, mapContainerRef, addMarkers]);

  if (isProjectDescriptionLoading) {
    return <div><Loader /></div>
  }

  return (
    <>
      <div className="description">
        <div className="titre_wrapper">
          <h1 className="title-h1">Contexte</h1>
          <BackButton />
        </div>

        <BannerProject bannerImage={projectDescription?.data.bannerImage ?? ''}
          localisation={projectDescription?.data.localisation as LocalisationType}
          projectType={projectDescription?.data.projectType as ProjectType}
          startDateFormatted={projectDescription?.data.startDateFormatted as string}
          projectStatus={projectDescription?.data.projectStatus as ProjectStatus}
          city={projectDescription?.data.city as string} />

        {
          projectDescription!.data.history.length > 0 &&
          <HistoryProject
            description={projectDescription!.data.history}
            button="VOIR MON PROJET"
            path={`/parents/${parentsId}/partners/${authContext?.user?.id}`}
          />
        }


        {
          projectDescription!.data.subProjects.length > 0 && (
            <SousProject
              city={projectDescription!.data.city}
              startDateFormatted={projectDescription!.data.startDateFormatted}
              subProjects={projectDescription!.data.subProjects}
              region={projectDescription!.data.localisation.region}
              country={projectDescription!.data.localisation.country}
            />
          )
        }

        {
          projectDescription!.data.galleries.length > 0 && (
            <Gallery galleries={projectDescription!.data.galleries} />
          )
        }
      </div>

      <div className="control_button_container">
        <ResetMap />
      </div>
    </>
  )
}
