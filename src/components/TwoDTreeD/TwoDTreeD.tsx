import { useContext, useState } from "react";
import Icon from "../Icomoon/Icomoon";
import { Tooltip } from 'react-tooltip';
import { MapboxContext } from "../../providers/mapbox/MapboxProvider";

function TwoDTreeD() {
    const [view, setView] = useState(false)

    const context = useContext(MapboxContext);

    if (!context) {
        throw new Error('Home must be used within a MapboxProvider');
    }

    const {
        mapRef
    } = context;

    const view3d = () => {
        if (!mapRef.current) return;

        setView(true);

        mapRef.current.flyTo({
            pitch: 55, // Inclinaison
            bearing: 30, // Rotation
            zoom: 14, // Zoom pour mieux voir l'effet 3D
            duration: 2000 // Animation fluide en 2 secondes
        });
    }


    const view2d = () => {
        if (!mapRef.current) return;

        setView(false);

        mapRef.current.flyTo({
            pitch: 0,
            bearing: 0,
            zoom: 12,
            duration: 2000
        });
    }

    return (
        <>

            <button
                className={`vue_3d ${view ? 'active' : ''} icon_button`}
                onClick={view3d}
                aria-label='Vue 3D'
                data-tooltip-id="vue_3d"
                data-tooltip-content="Vue 3D"
            >
                <Icon icon='3d' size={22} color='#ffffff' />
            </button>

            <button
                className={`vue_2d ${view ? '' : 'active'} icon_button`}
                onClick={view2d}
                aria-label='Vue 3D'
                data-tooltip-id="vue_2d"
                data-tooltip-content="Vue 2D"
            >
                <Icon icon='2d' size={22} color='#ffffff' />
            </button>

            <Tooltip id="vue_3d" place="left" />

            <Tooltip id="vue_2d" place="left" />
        </>
    )
}

export default TwoDTreeD;