
// import TreeSpecies from '../../components/TreeSpecies/TreeSpecies';
import StorytellingSpecies from '../../components/StorytellingSpecies/StorytellingSpecies';
import { BackButton } from "../../components/BackButton/BackButton.tsx";
import BannerProject from '../../components/BannerProject/BannerProject.tsx';
import { LocalisationType } from '../../models/Project.model.ts';
import Storytelling from '../../components/Storytelling/Storytelling.tsx';
import Gallery from '../../components/Galerie/Galerie.tsx';
import { useContext, useEffect, useRef, useState } from 'react';
import { MapboxContext } from '../../providers/mapbox/MapboxProvider.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import TreePopup from '../../components/TreePopup/TreePopup.tsx';
import { createRoot } from 'react-dom/client';
import ResetMap from '../../components/ResetMap/ResetMap.tsx';
import TwoDTreeD from '../../components/TwoDTreeD/TwoDTreeD.tsx';
import useDetailsParcelles from './useDetailsParcelles.ts';
import Loader from "../../components/Loader/Loader.tsx";
import { DetailsParcellesType, Parcel } from '../../models/DetailsParcelles.models.ts';
import TreeSpecies from '../../components/TreeSpecies/TreeSpecies.tsx';
import ShowDroneLayer from '../../components/ShowDroneLayer/ShowDroneLayer.tsx';
import { getCleanPath } from '../../utils/getCleanPath.ts';


function DetailsParcelles() {
    const context = useContext(MapboxContext);
    const markerRef = useRef<mapboxgl.Marker | null>(null);

    const location = useLocation();
    const navigate = useNavigate();

    const { detailsParcelles, isDetailsParcellesLoading, treesSpeciesList, isTreesSpeciesListLoading } = useDetailsParcelles();
    const [selectedStory, setSelectedStory] = useState<number | undefined>(undefined);
    const [showDrone, setShowDrone] = useState(false);


    if (!context) {
        throw new Error('MapboxContext must be used within a MapboxProvider');
    }

    const {
        mapContainerRef,
        mapRef,
        isMapInitialized,
        removeParcellesToMap,
        addParcellesToMap,
        addTreeMarkers,
        deactivateParcelleEvents,
        disableHoverEvents,
        showDroneImage,
        hideDroneImage
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

    // useEffect to add polygons
    useEffect(() => {
        if (!mapRef.current || !mapContainerRef.current) return;
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

    // useEffect to add tree markers
    useEffect(() => {
        const markers: mapboxgl.Marker[] = [];

        if (mapContainerRef.current && !isTreesSpeciesListLoading && treesSpeciesList?.data.parcel.treesJson) {
            treesSpeciesList?.data.parcel.treesJson.forEach((item) => {
                const marker = addTreeMarkers(item.coordinates, `${item.species.icon}`);

                if (marker) {
                    // Gestion de l'état du popup
                    const popupContainer = document.createElement("div");

                    // Injecter le composant React dans le popup
                    const root = createRoot(popupContainer);

                    root.render(
                        <TreePopup coordinates={item.coordinates} treeDetails={item.species} navigation={navigate} location={`${getCleanPath(location.pathname)}/tree/${item.id}`} />
                    );

                    const popup = new mapboxgl.Popup({ offset: 25 }).setDOMContent(popupContainer);
                    marker.setPopup(popup);

                    markers.push(marker);
                    markerRef.current = marker;
                }
            });
        }

        return () => {
            removeParcellesToMap('parcelles')
            markers.forEach(marker => marker.remove());
            if (markerRef.current) {
                markerRef.current.remove();
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapContainerRef, location.pathname, addTreeMarkers, isTreesSpeciesListLoading]);


    //useEffect to show and hide the drone image
    useEffect(() => {
        if (!mapRef.current || !mapContainerRef.current) return;

        if (showDrone && detailsParcelles?.data.parcel.tiffUrl) {
            showDroneImage(detailsParcelles?.data.parcel.tiffUrl, detailsParcelles?.data.parcel.tiffCoordinates as [number, number, number, number]);
        } else {
            hideDroneImage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [detailsParcelles?.data.parcel.tiffUrl, mapContainerRef, mapRef, showDrone]);

    if (isDetailsParcellesLoading) {
        return <div><Loader /></div>
    }

    const { treeSpecies, galleries, storyTelling, parcel, localisation } = detailsParcelles?.data as DetailsParcellesType;

    return (
        <>
            <div className="parcelles">
                <div className="titre_wrapper">
                    <h1 className="title-h1">Vos parcelles</h1>
                    <BackButton />
                </div>

                <BannerProject bannerImage={parcel.bannerImage}
                    localisation={localisation as LocalisationType}
                    startDateFormatted={parcel.startDateFormatted as string}
                    city={parcel.city as string} />


                {treeSpecies && <TreeSpecies TreeSpeciesItems={treeSpecies} setSelectedStory={setSelectedStory} selectedStory={selectedStory} />}

                {treeSpecies.length > 0 && (
                    <StorytellingSpecies
                        storytelling={
                            treeSpecies.find(item => item.id === selectedStory)
                                ?.storyTelling || treeSpecies[0].storyTelling
                        }
                    />
                )}

                {storyTelling.length > 0 &&
                    <Storytelling path='storytellingparcelles' storytelling={storyTelling} />
                }

                {galleries.length > 0 &&
                    <Gallery galleries={galleries} />
                }
            </div>

            <div className="control_button_container">
                <ResetMap />
                {detailsParcelles?.data.parcel.tiffUrl && <ShowDroneLayer showDrone={showDrone} setShowDrone={setShowDrone} />}
                <TwoDTreeD />
            </div>
        </>
    )
}

export default DetailsParcelles;