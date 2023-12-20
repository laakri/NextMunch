import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  selectedProductIds: string[] = [
    '6582b1ad8f4030bf950af26d',
    '6582baae8f4030bf950af296',
  ];
}
