import Icon from '../Icomoon/Icomoon';
import './StaticMarker.scss';

type StaticMarkerProps = {
    text?: string
}

function StaticMarker({ text }: StaticMarkerProps) {
    return (
        <div className="marker_container">
            <div className="static-marker">
                <div className="content">
                    <Icon icon='jardinage' size={27} color='#ffffff' />
                </div>
            </div>
            {text && <span className='marker_text'>{text}</span>}
        </div>
    )
}

export default StaticMarker;