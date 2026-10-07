import Icon from '../Icomoon/Icomoon.tsx';
import { useNavigate } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

export default function ResetMap() {
  const navigate = useNavigate();

  return (
    <>
      <button
        className="reset_map_zoom icon_button"
        onClick={() => navigate('/')}
        aria-label='Reinitialiser le zoom'
        data-tooltip-id="back-to-home"
        data-tooltip-content="Revenir à l’accueil"
      >
        <Icon icon='madagascar' size={22} color='#ffffff' />
      </button>
      <Tooltip id="back-to-home" place="left" />
    </>

  )
}