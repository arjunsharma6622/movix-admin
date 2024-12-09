import { GenreType } from "./genre";

export interface MovieType {
  _id?: string; // MongoDB ObjectId
  title: string;
  desc?: string; // Optional
  img?: string; // Optional
  imgTitle?: string; // Optional
  imgSm?: string; // Optional
  trailer?: string; // Optional
  video?: string; // Optional
  duration?:string;
  year?: number; // Optional
  limit?: number; // Optional
  genre: GenreType | string; // Reference to Genre schema
  isSeries?: boolean; // Defaults to false if not provided
}