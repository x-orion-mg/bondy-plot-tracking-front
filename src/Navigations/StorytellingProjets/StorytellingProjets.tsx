import { BackButton } from "../../components/BackButton/BackButton"
import ResetMap from "../../components/ResetMap/ResetMap"
import BannerStorytelling from "../../components/BannerStorytelling/BannerStorytelling"
import HistoryProjet from "../../components/HistoryProjet/HistoryProjet"
import Gallery from "../../components/Galerie/Galerie"
import useStorytelling from "./useStorytelling.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import { StorytellingData } from "../../models/Storytelling.model.ts";
import { useContext, useEffect } from "react";
import useProjectPartner from "../ProjectPartner/useProjectPartner.ts";
import { MapboxContext } from "../../providers/mapbox/MapboxProvider.tsx";

function StorytellingProjets() {
  const { storytelling, isStorytellingLoading } = useStorytelling();
  const { projectPartner, isProjectPartnerLoading } = useProjectPartner();
  const context = useContext(MapboxContext);


  if (!context) {
    throw new Error('ProjectPartner must be used within a MapboxProvider');
  }

  const { mapContainerRef, fitBoundsToPolygon, addMarkers } = context;

  useEffect(() => {
    const markers: mapboxgl.Marker[] = [];

    if (projectPartner) {
      fitBoundsToPolygon(projectPartner.data.projectChild.projectParent.localisation.bounds);

      if (mapContainerRef.current) {
        const marker = addMarkers([Number(projectPartner.data.projectChild.projectParent.localisation.latitude), Number(projectPartner.data.projectChild.projectParent.localisation.longitude)]);

        if (marker) {
          markers.push(marker);
        }
      }

      return () => {
        markers.forEach(marker => {
          marker.remove();
        });
      };
    }
  }, [projectPartner, fitBoundsToPolygon, mapContainerRef, addMarkers]);


  if (isStorytellingLoading || isProjectPartnerLoading) {
    return <Loader />
  }


  const { storyTelling: storytellingData, galleries } = storytelling?.data as StorytellingData;

  return (
    <>
      <div className="storytellingProjets">
        <div className="titre_wrapper">
          <h1 className="title-h1">Les moments forts</h1>
          <BackButton />
        </div>

        {
          storytellingData!.bannerImage && (
            <BannerStorytelling
              bannerImage={storytellingData.bannerImage}
              label={storytellingData.title}
            />
          )
        }

        {
          storytellingData!.content && (
            <HistoryProjet description={storytellingData!.content} />
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

export default StorytellingProjets