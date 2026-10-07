export type ProjectStatus =  {
  id: number;
  label: string;
  slug: string;
}

export type ProjectType ={
  id: number;
  label: string;
  slug: string;
  color: string;
}

export type ProjectFilterType = {
  id: number;
  name: string;
  slug: string;
}

export type LocalisationType = {
  id:number;
  country: string;
  region: string;
  shapeId: string;
  bounds: number[][];
  latitude: string;
  longitude: string;
}

export type ProjectParent = {
  id: string;
  city: string;
  history: string;
  status: string;
  startDate?: string;
  localisation: LocalisationType;
  projectStatus?: ProjectStatus;
  projectType: ProjectType;
  bannerImage: string;
}

