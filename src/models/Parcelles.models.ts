import { LocalisationType } from "./Project.model";

export type Parcelles = {

    projectChild: {
        id: number;
        city: string;
        bannerImage: string;
        projectParent: {
            localisation: LocalisationType
        };
        startDateFormatted: string
    };

    parcels: parcellesType[];

    treeSpecies: {
        id: number;
        commonName: string;
        scientificName: string;
        trackCode: string;
        banner: string;
        icon: string;
        usageType?: {
            id: number;
            label: string;
            icon: string;
        };
        treeCount: number;
        storyTelling: {
            description: string;
        };
    }[];

};


export type parcellesType = {
    id: number;
    title: string;
    city: string | null;
    latitude: string;
    longitude: string;
    delimitationJson: {
        type: string;
        geometry: {
            type: string;
            coordinates: number[][][];
        };
    };
}