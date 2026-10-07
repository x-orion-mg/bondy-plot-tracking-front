import { useContext, useEffect, useRef, useState } from 'react';
import Logo from '../../assets/images/logo.svg';
import Map from '../../components/Map/Map';
import { MapboxContext } from '../../providers/mapbox/MapboxProvider';
import Footer from '../../components/Footer/Footer.tsx';
import "./TreeDetailsClient.scss";
import Loader from "../../components/Loader/Loader.tsx";
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { createRoot, Root } from 'react-dom/client';
import TreeDetailsCard from '../../components/TreeDetailsCard/TreeDetailsCard.tsx';
import { TreeDetailsType } from '../../models/TreeDetailsPartner.ts';
import useTreeDetailsClient from './useTreeDetailsClient.ts';
import NotFoundFinalUser from '../../screens/NotFoundFinalUser/NotFoundFinalUser.tsx';
import TwoDTreeD from '../../components/TwoDTreeD/TwoDTreeD.tsx';



function TreeDetailsClient() {

    const { treeDetailsClient, isTreeDetailsClientLoading, isError } = useTreeDetailsClient();
    const rootRef = useRef<Root | null>(null);
    const context = useContext(MapboxContext);

    const popupContainerRef = useRef<HTMLDivElement | null>(null);
    const [showDetailsArbre, setShowDetailsArbre] = useState(window.innerWidth >= 991);

    if (!context) {
        throw new Error('ProjectPartner must be used within a MapboxProvider');
    }
    const { isMapInitialized,
        mapContainerRef,
        mapRef,
        disableHoverEvents,
        deactivateParcelleEvents,
        removeParcellesToMap,
        addTreeMarkers
    } = context;

    const [parcellesGeojson, setParcellesGeojson] = useState<GeoJSON.Feature<GeoJSON.Polygon>[]>([]);

    useEffect(() => {
        const mapParcellesData = async (parcels: TreeDetailsType['parcel']) => {
            setParcellesGeojson([
                parcels.delimitationJson as GeoJSON.Feature<GeoJSON.Polygon>
            ]);
        };

        if (treeDetailsClient?.status === "success") {
            mapParcellesData(treeDetailsClient?.data.parcel);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [treeDetailsClient?.data]);


    // useEffect to add the parcelles to the map
    useEffect(() => {
        if (!mapRef.current) return;

        const map = mapRef.current;

        if (parcellesGeojson.length != 0) {

            const addPolygons = () => {

                // if (mapRef.current) {
                //     addParcellesToMap(parcellesGeojson);
                // }

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

        disableHoverEvents();
        deactivateParcelleEvents();

        return () => {
            removeParcellesToMap('parcelles')
            deactivateParcelleEvents();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMapInitialized, location.pathname, mapRef, parcellesGeojson]);


    // useEffect to add the trees to the map


    useEffect(() => {
        const markers: mapboxgl.Marker[] = [];

        if (mapContainerRef.current && treeDetailsClient?.status === "success") {

            const marker = addTreeMarkers(treeDetailsClient.data.tree.coordinates, `${treeDetailsClient.data.tree.species.usageType.icon}`);

            if (marker) {
                // Vérifie si le popupContainer n'a pas encore été créé
                if (!popupContainerRef.current) {
                    const popupContainer = document.createElement("div");
                    // Ajouter le popupContainer à un élément du DOM existant, par exemple au body
                    document.body.querySelector(".mapContainer")?.appendChild(popupContainer);
                    popupContainerRef.current = popupContainer;  // Conserver la référence
                }

                // Si le root n'est pas déjà initialisé, crée un root
                if (!rootRef.current) {
                    rootRef.current = createRoot(popupContainerRef.current);
                }

                // Injecter ou mettre à jour le composant React dans le popup
                rootRef.current.render(
                    <div className={`treeDetails_container ${showDetailsArbre ? 'show' : 'hide'}`}>
                        <div className="treeDetails_wrapper">
                            {treeDetailsClient ? <TreeDetailsCard treeDetails={treeDetailsClient.data} /> : <Loader />}
                        </div>
                    </div>
                );

                markers.push(marker);
            }
        }

        return () => {
            removeParcellesToMap('parcelles');
            markers.forEach(marker => marker.remove());
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mapContainerRef, location.pathname, addTreeMarkers, treeDetailsClient?.data, showDetailsArbre]);

    if (isTreeDetailsClientLoading) {
        return <div className='fix-center'><Loader /></div>;
    }

    if (isError) {
        return <NotFoundFinalUser />
    }


    return (
        <>
            <header className='navBar'>
                <div className='header-container'>
                    <picture
                        title='Aller vers la page d’accueil'
                        aria-label='Aller vers la page d’accueil'
                    >
                        <picture className='logo'>
                            <img src={Logo} alt='Logo PlotTracking by Bondy' />
                        </picture>
                    </picture>
                </div>
            </header>

            <div className='map-container'>
                <div className='mapContainer'>
                    <Map ref={mapContainerRef} />
                    <Footer />
                </div>
            </div>

            <div className="control_button_container">
                <TwoDTreeD />
                <button className={`toggleSidebar carte`}
                    onClick={() => setShowDetailsArbre(!showDetailsArbre)}
                    aria-label='Voir details arbre'>
                    <span className='inside'>{showDetailsArbre ? 'Voir la carte' : 'Voir details arbre'}</span>
                </button>
            </div>
        </>
    )
}

export default TreeDetailsClient;