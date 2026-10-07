import {GalleryType} from "./ProjectDetails.model.ts";
import {LocalisationType} from "./Project.model.ts";

export type SubProjectData = {
  subProjects: {
    id: number;
    entityType: string;
    entityId: number;
    name: string;
    banner: string;
    startDate: string;
    city: string;
    icon: string;
    historyExcerpt: string;
    historyContent: string;
    latitude: string;
    longitude: string;
    startDateFormatted: string;
  };
  galleries: GalleryType[];
  localisation: LocalisationType;
}