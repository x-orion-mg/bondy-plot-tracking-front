
import { useEffect } from 'react';
import './language.scss';


function Language() {
  useEffect(() => {
    // Crée le script Google Translate
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);

    // Fonction d'initialisation de Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'fr',
          includedLanguages: 'en, fr',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, // Disposition simple
        },
        'google_translate_element' // ID du div où Google Translate sera inséré
      );
    };

    // Nettoyage du script après utilisation
    return () => {
      document.body.removeChild(script);
    };
  }, []);


  return (
    <div className='language'>
      <div id="google_translate_element"></div>
    </div>
  );
}

export default Language;
