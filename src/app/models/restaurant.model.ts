export interface Restaurant {
  _id?: string;
  ownerId: string;
  cin: number;
  bannerImg?: string;
  mainImg?: string;
  nameR: string;
  descriptionR?: string;
  location: string;
  contact: string;
  createdAt?: Date;
  updatedAt?: Date;
}
