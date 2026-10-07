import './TreeMarker.scss';

type StaticMarkerProps = {
    icon?: string
}

function TreeMarker({ icon }: StaticMarkerProps) {
    return (
        <div className="static-tree-marker">
            <div className="content">
                <img src={icon ? icon : '/icons/arbre.svg'} className="red-house-icon" alt="Icon marker" />
            </div>
        </div>
    )
}

export default TreeMarker;