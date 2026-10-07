import { LocalisationType } from './Project.model.ts';
import { GalleryType, SubProject } from './ProjectDetails.model.ts';
import { Storytelling } from "./Storytelling.model.ts";

export type ProjectPartner = {
  projectChild: {
    id: number;
    history: string;
    city: string;
    bannerImage: string;
    environmentalImpactPlantedTrees: number;
    environmentalImpactCO2: number;
    economicImpactSustainableEmployment: number;
    economicImpactRestoredHectares: number;
    socialImpactSeasonalJobs: number;
    socialImpactIndirectBeneficiaries: number;
    startDateFormatted: string;
    projectParent: {
      id: number;
      localisation: LocalisationType;
    };
  };
  subProjects: SubProject[];
  galleries: GalleryType[];
  storyTelling: Storytelling[]
}