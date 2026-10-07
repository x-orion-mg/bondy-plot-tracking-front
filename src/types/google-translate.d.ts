interface Window {
    googleTranslateElementInit: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    google: any; // Déclare `google` comme `any` pour éviter l'erreur.
}