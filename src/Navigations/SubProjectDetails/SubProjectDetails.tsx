import { BackButton } from "../../components/BackButton/BackButton.tsx";
import useSubProjectDetails from "./useSubProjectDetails.ts";
import Loader from "../../components/Loader/Loader.tsx";
import BannerProject from "../../components/BannerProject/BannerProject.tsx";
import { SubProjectData } from "../../models/Subproject.model.ts";
import HistoryProjet from "../../components/HistoryProjet/HistoryProjet.tsx";
import { useContext, useEffect } from "react";
import { MapboxContext } from "../../providers/mapbox/MapboxProvider.tsx";
import ResetMap from "../../components/ResetMap/ResetMap.tsx";
import Gallery from "../../components/Galerie/Galerie.tsx";

function SubProjectDetails() {
  const { subProjectDetails, isSubProjectDetailsLoading } = useSubProjectDetails();
  const context = useContext(MapboxContext);

  if (!context) {
    throw new Error('ProjectPartner must be used within a MapboxProvider');
  }

  const { mapContainerRef, fitBoundsToPolygon, addRedMarkers, enableHoverEvents } = context;

  useEffect(() => {
    const markers: mapboxgl.Marker[] = [];

    if (subProjectDetails) {
      fitBoundsToPolygon(subProjectDetails.data.localisation.bounds);

      if (mapContainerRef.current) {
        const marker = addRedMarkers([Number(subProjectDetails.data.subProjects.latitude), Number(subProjectDetails.data.subProjects.longitude)],
          subProjectDetails.data.subProjects.icon
        );

        if (marker) {
          markers.push(marker);
        }
      }

      enableHoverEvents();

      return () => {
        markers.forEach(marker => {
          marker.remove();
        });
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subProjectDetails, fitBoundsToPolygon, mapContainerRef, addRedMarkers]);

  if (isSubProjectDetailsLoading) {
    return <div><Loader /></div>
  }

  const { subProjects, localisation, galleries } = subProjectDetails?.data as SubProjectData;

  return (
    <>
      <div className="subProjectDetails">
        <div className="titre_wrapper">
          <h1 className="title-h1">Projets locaux</h1>
          <BackButton />
        </div>

        <BannerProject
          bannerImage={subProjects.banner}
          localisation={localisation}
          startDateFormatted={subProjects.startDateFormatted}
          city={subProjects.city}
        />

        {subProjects.historyContent && (
          <HistoryProjet description={subProjects.historyContent} />
        )}

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

export default SubProjectDetails;