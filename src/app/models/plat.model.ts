export class Plat {
  _id: string = '';
  nameP: string = '';
  descriptionP: string = '';
  imgP: File | null = null;
  categoryP: string[] = [];
  priceP: string = '';
  selected?: boolean;
}
