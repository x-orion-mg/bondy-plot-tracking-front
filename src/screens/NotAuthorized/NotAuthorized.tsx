import Footer from '../../components/Footer/Footer.tsx';
import Logo from '../../assets/images/logo.svg';

export function NotAuthorized() {
  return (
    <>
      <div className="not-found not-authorized">

        <figure className='logo'>
          <img src={Logo} alt='Logo PlotTracking by Bondy' />
        </figure>

        <h1>Erreur</h1>

        <figure>
          <img src='/images/img_403.png' width="691" height="305" alt="Erreur de la page" />
        </figure>

        <p>Désolé ! vous n’avez pas accès à cette page ou à cette ressource</p>

      </div>

      <div className="dashboard">
        <Footer />
      </div>
    </>
  )
}