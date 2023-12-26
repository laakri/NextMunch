import { Categorie } from "./categorie.model";
export interface Restaurant {
  _id?: string;
  ownerId: string;
  cin: string;
  bannerImg?: File | null; // Make it optional
  mainImg?: File | null;   // Make it optional
  nameR: string;
  descriptionR?: string;
  location: string;
  contact: string;
  openDates?: string;
  closeDates?: string;
  createdAt?: Date;
  updatedAt?: Date;
  reviews?: number; 
  categories: Categorie[];
}
