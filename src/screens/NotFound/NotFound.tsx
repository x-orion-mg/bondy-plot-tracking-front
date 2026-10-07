import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import './NotFound.scss'
import Footer from '../../components/Footer/Footer.tsx';

export default function NotFound() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const userName = searchParams.get('name');

  return (
    <>
      <div className="not-found">

        <h1>Erreur</h1>
        <figure>
          <img src='/images/img_404.png' width="750" height="279" alt="Erreur de la page" />
        </figure>

        {userName ? (
          <p>L'utillisateur de ce token est introuvable. Veuillez verifier votre URL.</p>) : (<p>Le client ou l'arbre est introuvable. Veuillez vérifier votre URL.</p>
        )}


        <div className="btn-container">
          <Link to='/' className="btn btn-rounded red">
            Revenir à la page d'accueil
          </Link>

          <button type="button" className="btn btn-rounded green" onClick={() => navigate(-1)}>
            Revenir à la page précédente
          </button>
        </div>

      </div>

      <div className='dashboard'>
        <Footer />
      </div>
    </>

  )
}