import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  selectedProductIds: string[] = [
 
  ];
  restaurantId: string | null = '';
  isTheOwner: boolean | null = false;
}
