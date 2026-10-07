import DroneIcon from "/images/drone.svg";

type ShowDroneLayerProps = {
    showDrone: boolean;
    setShowDrone: React.Dispatch<React.SetStateAction<boolean>>;
};

function ShowDroneLayer({ showDrone, setShowDrone }: ShowDroneLayerProps) {

    return (
        <button
            className={`icon_button ${showDrone ? 'active' : ''}`}
            onClick={() => setShowDrone(prev => !prev)}
        >
            <img src={DroneIcon} alt="Drone" width={22} height={22} />
        </button>
    )
}

export default ShowDroneLayer;