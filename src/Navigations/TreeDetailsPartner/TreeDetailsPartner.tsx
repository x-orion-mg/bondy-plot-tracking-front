import { useContext, useEffect, useRef, useState } from "react";
import "./TreeDetailsPartner.scss";
import { MapboxContext } from "../../providers/mapbox/MapboxProvider";
import Loader from "../../components/Loader/Loader.tsx";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { useLocation, useNavigate } from "react-router-dom";
import useDetailsParcelles from "../DetailsParcelles/useDetailsParcelles";
import { Parcel } from "../../models/DetailsParcelles.models";
import ResetMap from "../../components/ResetMap/ResetMap.tsx";
import TwoDTreeD from "../../components/TwoDTreeD/TwoDTreeD.tsx";
import TreeDetailsCard from "../../components/TreeDetailsCard/TreeDetailsCard.tsx";
import Icon from "../../components/Icomoon/Icomoon.tsx";
import { createRoot } from "react-dom/client";
import useTreeDetailsPartner from "./useTreeDetailsPartner.ts";

function TreeDetailsPartner() {

    const context = useContext(MapboxContext);
    const markerRef = useRef<mapboxgl.Marker | null>(null);
    const rootRef = useRef<ReturnType<typeof createRoot> | null>(null);

    const location = useLocation();
    const navigate = useNavigate();

    const { detailsParcelles, isDetailsParcellesLoading } = useDetailsParcelles();
    const { treeDetailsPartner, isTreeDetailsPartnerLoading } = useTreeDetailsPartner();

    const popupContainerRef = useRef<HTMLDivElement | null>(null);

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

    useEffect(() => {
        const markers: mapboxgl.Marker[] = [];

        if (mapContainerRef.current && treeDetailsPartner?.status === "success") {

            const marker = addTreeMarkers(treeDetailsPartner.data.tree.coordinates, `${treeDetailsPartner.data.tree.species.usageType.icon}`);

            if (marker) {
                if (!popupContainerRef.current) {
                    const popupContainer = document.createElement("div");
                    document.body.querySelector("main")?.appendChild(popupContainer);
                    popupContainerRef.current = popupContainer;

                    // Crée et stocke la root React pour pouvoir la démonter plus tard
                    rootRef.current = createRoot(popupContainer);
                }

                // Render le composant React
                rootRef.current?.render(
                    <div className={`treeDetails_container show`}>
                        <div className="treeDetails_wrapper">
                            {isTreeDetailsPartnerLoading ? <Loader /> : <TreeDetailsCard treeDetails={treeDetailsPartner.data} />}
                        </div>
                    </div>
                );

                markers.push(marker);
                markerRef.current = marker;
            }
        }

        return () => {
            // Supprime les marqueurs
            removeParcellesToMap('parcelles');
            markers.forEach(marker => marker.remove());
            markerRef.current?.remove();

            // Unmount proprement le popup React
            if (rootRef.current) {
                setTimeout(() => {
                    rootRef.current?.unmount();
                    rootRef.current = null;
                });
            }

            // Supprime l'élément DOM
            if (popupContainerRef.current) {
                setTimeout(() => {
                    popupContainerRef.current?.remove();
                    popupContainerRef.current = null;
                });
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapContainerRef, location.pathname, addTreeMarkers, treeDetailsPartner?.data]);


    if (isDetailsParcellesLoading) {
        return <div><Loader /></div>
    }


    return (
        <>
            <div className="treeDetailsPartner">
                Si vous voyez cette phrase, alors votre navigateur n'est pas à jour.
            </div>


            <div className="backToPage" onClick={() => navigate(-1)}>
                <button
                    className="link link-with-icon"
                >
                    <Icon
                        icon="arrow_right_link"
                        size={16}
                        color='#666666'
                    />
                    Retour
                </button>
            </div>

            <div className="control_button_container">
                <ResetMap />
                <TwoDTreeD />
            </div>
        </>
    )
}

export default TreeDetailsPartner;