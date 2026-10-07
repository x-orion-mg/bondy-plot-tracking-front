
import "./TreePopup.scss";
import Icon from "../Icomoon/Icomoon";

import { useNavigate } from "react-router-dom";
import { Species } from "../../models/TreesSpeciesList.models";

interface TreePopupProps {
    navigation?: ReturnType<typeof useNavigate>;
    location: string;
    treeDetails: Species;
    coordinates: number[];
}

function TreePopup({ navigation, location, treeDetails, coordinates }: TreePopupProps) {

    const handleClick = () => {
        if (!navigation) return;
        navigation(location);
    }

    return (
        <div className="treePopup_container">
            <div className="left">
                <picture>
                    <img src={treeDetails.banner} alt="photo d'un arble ou d'un paysage" />
                </picture>
            </div>

            <div className="right">
                <div className="right_wrapper">
                    <div className="tree_code">
                        <span className="data_title">Track code :</span>
                        <span className="data_value">{treeDetails.trackCode}</span>
                    </div>

                    <div className="tree_species">
                        <span>Espèce d'arbre :</span>
                        <span>{treeDetails.commonName}</span>
                    </div>

                    <div className="tree_usage">
                        <span className="data_title">Type d'utilisation :</span>
                        <span className="data_value">{treeDetails.usageType.label}</span>
                    </div>

                    <div className="tree_coordonnate">
                        <span className="data_title">Coordonnées :</span>
                        <span className="data_value">
                            {coordinates.map(num => num.toFixed(4)).join(', ')}
                        </span>
                    </div>

                    <button onClick={handleClick} className='btn-with-icon btn custom_btn'>
                        <div>
                            VOIR FICHE ARBRE <Icon icon="arrow_right_link" size={20} color='var(--color-secondary)' />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TreePopup;