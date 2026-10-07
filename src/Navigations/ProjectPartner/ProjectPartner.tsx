import ImpactTable from '../../components/ImpactTable/ImpactTable';
import Storytelling from '../../components/Storytelling/Storytelling';
import ResetMap from '../../components/ResetMap/ResetMap.tsx';
import { BackButton } from '../../components/BackButton/BackButton.tsx';
import useProjectPartner from "./useProjectPartner.ts";
import Loader from "../../components/Loader/Loader.tsx";
import BannerProject from "../../components/BannerProject/BannerProject.tsx";
import type { ProjectPartner as ProjectPartnerType } from "../../models/ProjectPartner.model.ts";
import HistoryProjet from "../../components/HistoryProjet/HistoryProjet.tsx";
import SousProject from "../../components/SousProject/SousProject.tsx";
import Gallery from "../../components/Galerie/Galerie.tsx";
import { useContext, useEffect, useRef } from "react";
import { MapboxContext } from "../../providers/mapbox/MapboxProvider.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { getCleanPath } from '../../utils/getCleanPath.ts';

function ProjectPartner() {
  const context = useContext(MapboxContext);
  const { projectPartner, isProjectPartnerLoading } = useProjectPartner();
  const location = useLocation();
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const navigate = useNavigate();
  const currentPath = location.pathname;


  if (!context) {
    throw new Error('ProjectPartner must be used within a MapboxProvider');
  }

  const { mapContainerRef, fitBoundsToPolygon, addMarkers, disableHoverEvents } = context;

  const handleMarkerClick = () => {
    if (markerRef.current) {
      navigate(`${getCleanPath(currentPath)}/child/${projectChild.id}`);
    }
  }

  useEffect(() => {
    const markers: mapboxgl.Marker[] = [];

    if (projectPartner) {
      fitBoundsToPolygon(projectPartner.data.projectChild.projectParent.localisation.bounds);

      if (mapContainerRef.current) {
        const marker = addMarkers([Number(projectPartner.data.projectChild.projectParent.localisation.latitude), Number(projectPartner.data.projectChild.projectParent.localisation.longitude)]);

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
          marker.getElement().removeEventListener('click', handleMarkerClick);
        });

        if (markerRef.current) {
          markerRef.current.remove();
        }
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectPartner, fitBoundsToPolygon, mapContainerRef, addMarkers]);

  if (isProjectPartnerLoading) {
    return <div><Loader /></div>
  }

  const { galleries, subProjects, projectChild, storyTelling } = projectPartner?.data as ProjectPartnerType;

  return (
    <>
      <div className="impact">
        <div className="titre_wrapper">
          <h1 className="title-h1">Histoire du partenariat</h1>
          <BackButton />
        </div>

        <BannerProject
          bannerImage={projectChild.bannerImage}
          startDateFormatted={projectChild.startDateFormatted}
          city={projectChild.city}
          localisation={projectChild.projectParent.localisation}
        />

        {projectChild && <ImpactTable projectChild={projectChild} />}

        {projectChild.history &&
          <HistoryProjet description={projectChild.history} button="VOIR PARCELLES" path={`${currentPath}/child/${projectChild.id}`} />
        }


        {storyTelling.length > 0 &&
          <Storytelling path='storytellingprojet' storytelling={storyTelling} />
        }


        {
          (subProjects.length > 0) && (
            <SousProject
              startDateFormatted={projectChild.startDateFormatted}
              country={projectChild.projectParent.localisation.country}
              region={projectChild.projectParent.localisation.region}
              city={projectChild.city}
              subProjects={subProjects}
              isLink={true}
            />
          )
        }

        {
          galleries.length > 0 && (
            <Gallery galleries={galleries} />
          )
        }

      </div>

      <div className="control_button_container">
        <ResetMap />
      </div>
    </>
  )
}

export default ProjectPartner;