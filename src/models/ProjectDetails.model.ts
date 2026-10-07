import { LocalisationType, ProjectStatus, ProjectType } from './Project.model.ts';

export type SubProject = {
  id: number;
  name: string;
  banner: string;
}

export type GalleryType = {
  id: number;
  caption: string;
  type: string;
  url: string;
  thumbnailUrl: string;
}

export type ProjectDetails = {
  id: number;
  city: string;
  startDate: string;
  history: string;
  bannerImage: string;
  projectType: ProjectType;
  projectStatus: ProjectStatus;
  localisation: LocalisationType;
  startDateFormatted: string;
  galleries: GalleryType[];
  subProjects: SubProject[];
}