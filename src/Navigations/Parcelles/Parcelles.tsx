import ParcelleFilter from '../../components/ParcelleFilter/ParcelleFilter';
import TreeSpecies from '../../components/TreeSpecies/TreeSpecies';
import StorytellingSpecies from '../../components/StorytellingSpecies/StorytellingSpecies';
import { BackButton } from "../../components/BackButton/BackButton.tsx";
import BannerProject from '../../components/BannerProject/BannerProject.tsx';
import { LocalisationType } from '../../models/Project.model.ts';
import { useContext, useEffect, useRef, useState } from 'react';
import { MapboxContext } from '../../providers/mapbox/MapboxProvider.tsx';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { useLocation, useNavigate } from 'react-router-dom';
import useParcelles from './useParcelles.ts';
import Loader from "../../components/Loader/Loader.tsx";
import { parcellesType, Parcelles as ParcellesType } from '../../models/Parcelles.models.ts';
import ResetMap from '../../components/ResetMap/ResetMap.tsx';
import TwoDTreeD from '../../components/TwoDTreeD/TwoDTreeD.tsx';
import { getCleanPath } from '../../utils/getCleanPath.ts';

export type Story = {
  id: number;
  text: string;
};


function Parcelles() {
  const context = useContext(MapboxContext);
  const markerRef = useRef<mapboxgl.Marker | null>(null);
  const { parcelles, isParcellesLoading } = useParcelles();

  const [selectedStory, setSelectedStory] = useState<number | undefined>(undefined);

  const location = useLocation();
  const navigate = useNavigate();

  if (!context) {
    throw new Error('Home must be used within a MapboxProvider');
  }

  const {
    mapRef,
    isMapInitialized,
    addParcellesToMap,
    removeParcellesToMap,
    addMarkers,
    disableHoverEvents,
    activateParcelleEvents,
    hoveredParcelleId,
    deactivateParcelleEvents
  } = context;


  // contient les coordonnées des parcelles
  const parcellesGeojson: GeoJSON.Feature<GeoJSON.Polygon>[] = [];


  useEffect(() => {
    const mapParcellesData = async (parcels: parcellesType[]) => {
      parcels.forEach((parcelle) => {
        parcellesGeojson.push(
          parcelle.delimitationJson as GeoJSON.Feature<GeoJSON.Polygon>
        );
      });
    };

    if (parcelles?.status === "success") {
      mapParcellesData(parcelles?.data.parcels);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parcelles]);


  // useEffect to add polygons
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    if (parcellesGeojson.length != 0) {

      const addPolygons = () => {

        if (mapRef.current) {
          addParcellesToMap(parcellesGeojson);
        }

        const bounds = new mapboxgl.LngLatBounds();
        parcellesGeojson.forEach((feature) => {
          feature.geometry.coordinates[0].forEach((coord) => {
            bounds.extend(coord as LngLatLike);
          });
        });

        mapRef.current?.fitBounds(bounds, { padding: 20 });
      };


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


    // add marker to shape
    const markers: mapboxgl.Marker[] = [];

    if (parcelles?.data.parcels) {

      parcelles?.data.parcels.forEach((item) => {
        const marker = addMarkers([parseFloat(item.latitude), parseFloat(item.longitude)], item.title);
        if (marker) {
          markers.push(marker);
          markerRef.current = marker;
        }
      })

    }

    disableHoverEvents();
    activateParcelleEvents();


    return () => {
      removeParcellesToMap('parcelles')
      deactivateParcelleEvents();

      markers.forEach(marker => {
        marker.remove();
      });
      if (markerRef.current) {
        markerRef.current.remove();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapInitialized, location.pathname, parcelles?.data, mapRef]);



  // Click on parcelles
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    const handleClick = () => {
      if (
        hoveredParcelleId.current &&
        !location.pathname.endsWith(`/parcelle/${hoveredParcelleId.current}`)
      ) {
        navigate(`${getCleanPath(location.pathname)}/parcelle/${hoveredParcelleId.current}`);
      }
    };

    map.on("click", "parcelles-fill", handleClick);

    return () => {
      map.off("click", "parcelles-fill", handleClick);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hoveredParcelleId.current]);


  // Select first story
  useEffect(() => {
    if (parcelles?.data?.treeSpecies?.[0]?.id) {
      setSelectedStory(parcelles.data.treeSpecies[0].id);
    }
  }, [parcelles]);



  if (isParcellesLoading) {
    return <div><Loader /></div>
  }

  const { parcels, projectChild, treeSpecies } = parcelles?.data as ParcellesType;


  return (
    <>
      <div className="parcelles">
        <div className="titre_wrapper">
          <h1 className="title-h1">Vos parcelles</h1>
          <BackButton />
        </div>

        {projectChild &&
          <BannerProject bannerImage={projectChild?.bannerImage}
            localisation={projectChild.projectParent.localisation as LocalisationType}
            startDateFormatted={projectChild.startDateFormatted as string}
            city={projectChild.city as string} />}

        {parcels.length > 0 && <ParcelleFilter parcelles={parcels} />}

        {treeSpecies.length > 0 && <TreeSpecies TreeSpeciesItems={treeSpecies} setSelectedStory={setSelectedStory} selectedStory={selectedStory} />}

        {treeSpecies.length > 0 && (
          <StorytellingSpecies
            storytelling={treeSpecies.find(item => item.id === selectedStory)?.storyTelling || undefined}
          />
        )}

      </div>

      <div className="control_button_container">
        <ResetMap />
        <TwoDTreeD />
      </div>
    </>
  )
}

export default Parcelles;