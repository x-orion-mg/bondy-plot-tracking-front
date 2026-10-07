import { BackButton } from "../../components/BackButton/BackButton"
import ResetMap from "../../components/ResetMap/ResetMap"
import BannerStorytelling from "../../components/BannerStorytelling/BannerStorytelling"
import HistoryProjet from "../../components/HistoryProjet/HistoryProjet"
import Gallery from "../../components/Galerie/Galerie"
import useStorytelling from "./useStorytellingParcelles.tsx";
import Loader from "../../components/Loader/Loader.tsx";
import { StorytellingData } from "../../models/Storytelling.model.ts";
import { useContext, useEffect, useState } from "react";
import { MapboxContext } from "../../providers/mapbox/MapboxProvider.tsx";
import useDetailsParcelles from "../DetailsParcelles/useDetailsParcelles.ts"
import { Parcel } from "../../models/DetailsParcelles.models.ts"
import mapboxgl, { LngLatLike } from "mapbox-gl"
import { useLocation } from "react-router-dom"

function StorytellingParcelles() {
  const { storytelling, isStorytellingLoading } = useStorytelling();
  const { detailsParcelles, isDetailsParcellesLoading } = useDetailsParcelles();
  const context = useContext(MapboxContext);
  const location = useLocation();


  if (!context) {
    throw new Error('ProjectPartner must be used within a MapboxProvider');
  }

  const {
    mapRef,
    isMapInitialized,
    removeParcellesToMap,
    addParcellesToMap,
    deactivateParcelleEvents,
    disableHoverEvents
  } = context;

  const [parcellesGeojson, setParcellesGeojson] = useState<GeoJSON.Feature<GeoJSON.Polygon>[]>([]);

  useEffect(() => {
    const mapParcellesData = async (parcels: Parcel) => {
      setParcellesGeojson([
        parcels.delimitationJson as GeoJSON.Feature<GeoJSON.Polygon>
      ]);
    };

    if (detailsParcelles?.status === "success") {
      mapParcellesData(detailsParcelles?.data.parcel);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailsParcelles?.data]);


  useEffect(() => {
    if (!mapRef.current) return;
    const map = mapRef.current;

    if (parcellesGeojson.length != 0) {
      const addPolygons = () => {
        addParcellesToMap(parcellesGeojson);


        const bounds = new mapboxgl.LngLatBounds();
        parcellesGeojson.forEach((feature) => {
          feature.geometry.coordinates[0].forEach((coord) => {
            bounds.extend(coord as LngLatLike);
          });
        });

        mapRef.current?.fitBounds(bounds, { padding: 20 });
      };


      disableHoverEvents();
      deactivateParcelleEvents();

      const handleIdle = () => {
        addPolygons();
        map.off("idle", handleIdle);
      };

      if (map.isStyleLoaded()) {
        addPolygons();
      } else {
        map.on("idle", handleIdle);
      }
    }

    return () => {
      removeParcellesToMap('parcelles')
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapInitialized, location.pathname, parcellesGeojson, mapRef]);




  if (isDetailsParcellesLoading || isStorytellingLoading) {
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

export default StorytellingParcelles