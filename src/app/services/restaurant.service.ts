import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';
import { Categorie } from '../models/categorie.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private apiUrl = 'http://localhost:4401/api/restos';

  constructor(private http: HttpClient) {}

  getRestaurantById(restaurantId: string): Observable<Restaurant> {
    const url = `${this.apiUrl}/restaurant/${restaurantId}`;
    return this.http.get<Restaurant>(url);
  }
  saveRestaurant(restaurant: Restaurant): Observable<any> {
    return this.http.post(this.apiUrl + '/restaurants', restaurant);
  }
  addCategoryToRestaurant(restaurantId: string, categoryId: string): Observable<any> {
    const url = `${this.apiUrl}/restaurants/${restaurantId}/ajouter-categories`;
    return this.http.post(url, { categorie: categoryId });
  }
  getRestoCategs(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/liste-categ/657f424f039fab1ba487503b`);
  }
 
}
