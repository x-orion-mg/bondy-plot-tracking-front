import Icon from '../Icomoon/Icomoon.tsx';
import { useNavigate } from 'react-router-dom';

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      className="link link-with-icon"
      onClick={() => navigate(-1)}
    >
      <Icon
        icon="arrow_right_link"
        size={16}
        color='#666666'
      />
      Retour
    </button>
  )
}