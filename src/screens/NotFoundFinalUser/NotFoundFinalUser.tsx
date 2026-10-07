import Footer from "../../components/Footer/Footer";
import "./NotFoundFinalUser.scss";


function NotFoundFinalUser() {
    return (
        <>
            <div className="not-found full-height">

                <h1>Erreur</h1>
                <figure>
                    <img src='/images/img_404.png' width="750" height="279" alt="Erreur de la page" />
                </figure>

                <p>Le client ou l'arbre est introuvable. Veuillez vérifier votre URL.</p>

            </div>

            <div className='dashboard'>
                <Footer />
            </div>
        </>

    )
}

export default NotFoundFinalUser;