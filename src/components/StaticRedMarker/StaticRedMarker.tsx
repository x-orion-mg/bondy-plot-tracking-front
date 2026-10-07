import './StaticRedMarker.scss';

type StaticRedMarkerProps = {
  icon: string;
}

export default function StaticRedMarker({icon}: StaticRedMarkerProps) {
  return (
    <div className="static-red-marker">
      <img src='/icons/house.svg' className="red-house" alt="Red house marker"/>
      <img src={icon} className="red-house-icon" alt="Icon marker"/>
    </div>
  )
}