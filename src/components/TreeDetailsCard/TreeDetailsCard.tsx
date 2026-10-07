import { TreeDetailsType } from "../../models/TreeDetailsPartner";

type TreeDetailsCardProps = {
    treeDetails: TreeDetailsType
};

function TreeDetailsCard({ treeDetails }: TreeDetailsCardProps) {

    return (
        <>
            <div className="owner">
                <div className="owner_name">Arbre planté par :</div>
                <picture className="owner_image">
                    <img src={treeDetails.partner.logo} alt="Logo de l'utilisateur" />
                </picture>
            </div>

            <picture className="tree_banner">
                <img src={treeDetails.tree.species.banner} alt="Banner Details Arbre" />
            </picture>

            <div className="client_details">
                {treeDetails.allocatedTree ? (
                    <div className="client_name">
                        <span className="data_title">Au nom de :</span>
                        <span className="data_value">{treeDetails.allocatedTree.user.lastName}</span>
                    </div>
                ) : (
                    null
                )}

                <div className="track_code">
                    <span className="data_title">Track code :</span>
                    <span className="data_value">{treeDetails.tree.id}</span>
                </div>

                <div className="tree_species">
                    <span>Espèce d'arbre :</span>
                    <span>{treeDetails.tree.species.commonName}</span>
                </div>

                <div className="tree_usage">
                    <span className="data_title">Type d'utilisation :</span>
                    <span className="data_value">{treeDetails.tree.species.usageType.label}</span>
                </div>

                <div className="tree_coordonnate">
                    <span className="data_title">Coordonnées :</span>
                    <span className="data_value">
                        {treeDetails.tree.coordinates.map(num => num.toFixed(4)).join(', ')}
                    </span>
                </div>

                <div className="tree_localisation">
                    <span className="data_title">Localisation :</span>
                    <span className="data_value">{treeDetails.localisation.region}, {treeDetails.localisation.country}</span>
                </div>

                <div className="tree_age">
                    <span className="data_title">Age de l'arbre :</span>
                    <span className="data_value">{treeDetails.parcel.treeAge} an(s)</span>
                </div>
            </div>
        </>
    )
}

export default TreeDetailsCard;