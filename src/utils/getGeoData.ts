const getGeoData = async (url: string) => {
    // Vérifiez si les données sont déjà dans le localStorage
    const storedData = localStorage.getItem('madagascarData');
    if (storedData) {
        try {
            return JSON.parse(storedData);
        } catch (error) {
            console.warn('Données corrompues dans le localStorage. Tentative de récupération depuis le fichier.');
            console.error('Erreur:', error);
            localStorage.removeItem('madagascarData'); // Supprime les données corrompues
        }
    }

    // Chargez les données à partir du fichier si elles ne sont pas en localStorage ou sont corrompues
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erreur lors du chargement du fichier GeoJSON');
        }
        const geoData = await response.json();
        // Stockez les données dans le localStorage pour une utilisation future
        localStorage.setItem('madagascarData', JSON.stringify(geoData));
        return geoData;
    } catch (error) {
        console.error('Erreur:', error);
        return null; // Retourne null en cas d'erreur
    }
};

export default getGeoData;
