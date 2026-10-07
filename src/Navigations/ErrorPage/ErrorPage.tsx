import { useNavigate } from "react-router-dom";
import "./ErrorPage.scss";

function ErrorPage() {
    const navigation = useNavigate();

    return (
        <div className="error-500">

            <picture className="logo">
                <img src="/images/logo.svg" />
            </picture>

            <div className="browser">
                <div className="controls">
                    <i></i>
                    <i></i>
                    <i></i>
                </div>

                <div className="eye"></div>
                <div className="eye"></div>
                <div className="mouth">
                    <div className="lips"></div>
                    <div className="lips"></div>
                    <div className="lips"></div>
                    <div className="lips"></div>
                    <div className="lips"></div>
                    <div className="lips"></div>
                    <div className="lips"></div>
                    <div className="lips"></div>
                </div>
            </div>


            <div className="text_container">
                <h1>Oups, une erreur est survenue.</h1>
                <p>Nous ne pouvons pas traiter votre demande pour le moment. Veuillez actualiser la page ou revenir à l’accueil.</p>

                <div className="button_wrapper">
                    <button className="btn btn-primary green" onClick={() => navigation("/")}>Page d’accueil</button>
                    <button className="btn btn-primary" onClick={() => window.location.reload()}>Actualiser</button>
                </div>
            </div>



        </div>
    )
}

export default ErrorPage