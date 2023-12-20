import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  selectedProductIds: string[] = [
    '658316688a06b1e6daa77891',
    '658316848a06b1e6daa77898',
  ];
  restaurantId: string | null = '658313ea8a06b1e6daa77841';
}
