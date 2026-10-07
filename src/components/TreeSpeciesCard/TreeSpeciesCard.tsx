import './TreeSpeciesCard.scss';
import Icon from '../Icomoon/Icomoon';
import { TreeSpecies } from '../../models/TreeSpecies.model';

function TreeSpeciesCard({ TreeSpeciesProps, selectedStory }: { TreeSpeciesProps: TreeSpecies, selectedStory: number | undefined }) {


    return (
        <div className={`treeSpeciesCard ${selectedStory === TreeSpeciesProps.id ? 'active' : ''}`}>
            <picture className="treeSpeciesCard-picture">
                <img src={TreeSpeciesProps.banner} alt="Banner image" />
            </picture>

            <div className="treeSpeciesCard-details">

                <div className="treeSpeciesCard-localisation">
                    <figure className="icone">
                        <Icon icon='tree_9' size={16.5} color='#666666' />
                    </figure>
                    <div className="treeSpeciesCard-text">
                        <span>{TreeSpeciesProps.commonName}</span>
                    </div>
                </div>
                <div className="treeSpeciesCard-tree">
                    <figure className="icone">
                        <Icon icon='tree_10' size={16.5} color='#666666' />
                    </figure>
                    <div className="treeSpeciesCard-text">
                        <span>{TreeSpeciesProps.treeCount}</span>
                        <span>arbres</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TreeSpeciesCard;