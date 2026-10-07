import { LocalisationType } from "./Project.model";
import { GalleryType } from "./ProjectDetails.model";
import { Storytelling } from "./Storytelling.model";
import { TreeSpeciesList } from "./TreeSpecies.model";



type DelimitationJson = {
    type: string;
    geometry: {
        type: string;
        coordinates: number[][][];
    };
};

export type Parcel = {
    id: number;
    title: string;
    tiffUrl: string | null;
    tiffCoordinates: [number, number, number, number] | null;
    startDate: string;
    plantingYear: string;
    city: string | null;
    latitude: number;
    longitude: number;
    bannerImage: string;
    delimitationJson: DelimitationJson;
    startDateFormatted: string;
};

export type DetailsParcellesType = {
    projectChild: [];
    parcel: Parcel;
    treeSpecies: TreeSpeciesList;
    galleries: GalleryType[];
    storyTelling: Storytelling[];
    localisation: LocalisationType
};
