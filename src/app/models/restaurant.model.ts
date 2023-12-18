export interface Restaurant {
  _id?: string;
  ownerId: string;
  cin: string;
  bannerImg: File | null;
  mainImg: File | null;
  nameR: string;
  descriptionR?: string;
  location: string;
  contact: string;
  startDate?: Date;
  endDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
