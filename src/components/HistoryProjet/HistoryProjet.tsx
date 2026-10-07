import './HistoryProjet.scss';
import { Link } from 'react-router-dom'
import Icon from '../Icomoon/Icomoon'
import "../../assets/scss/common/_rte.scss";

type HistoryProjectProps = {
  button?: string;
  path?: string;
  description: string;
}

function HistoryProjet({ button, path, description }: HistoryProjectProps) {
  return (
    <section className="historiProjet">
      <h2 className="title-h2">Histoire du projet</h2>

      <div className="historiProjet-text rte" dangerouslySetInnerHTML={{ __html: description }} />

      {path && button &&
        <Link to={path} className='btn btn-with-icon history-project-link'>
          <div>
            {button} <Icon icon="arrow_right_link" size={20} color='var(--color-secondary)' />
          </div>
        </Link>}
    </section>
  )
}

export default HistoryProjet;