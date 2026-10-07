import {GalleryType} from "./ProjectDetails.model.ts";

export type Storytelling = {
  id: number;
  title: string;
  description: string;
  content: string;
  bannerImage: string;
}

export type StorytellingData = {
  storyTelling: Storytelling;
  galleries: GalleryType[];
}