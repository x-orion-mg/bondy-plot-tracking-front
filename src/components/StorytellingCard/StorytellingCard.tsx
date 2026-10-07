import { Link } from 'react-router-dom';
import './StorytellingCard.scss';
import { useLocation } from 'react-router-dom';
import { getCleanPath } from '../../utils/getCleanPath';

type StorytellingCardProps = {
  title: string;
  description: string;
  id: number;
  path: string;
}

function StorytellingCard({ title, description, id, path }: StorytellingCardProps) {
  const location = useLocation();
  const currentUrl = location.pathname;

  return (
    <div className='storytellingCard'>
      <div className="storytellingCard_wrapper">
        <h3 className="title-h3">{title}</h3>

        <div className="storytellingCard_text">
          <p className="paragrath">{description}</p>
        </div>
        { /* TODO: Fix the a tag after sprint 3 */}
        {/*<a href="/storytelling" className="btn btn-primary">En savoir plus</a>*/}

        <Link
          to={`${getCleanPath(currentUrl)}/${path}/${id}`}
          className="btn btn-primary">
          En savoir plus
        </Link>

      </div>
    </div>
  )
}

export default StorytellingCard;