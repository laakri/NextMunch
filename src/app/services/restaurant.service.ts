import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Restaurant } from '../models/restaurant.model';

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
  updateRestaurant(data: any): Observable<any> {
    const url = `${this.apiUrl}/UpdateRestaurant/${data.restaurantId}`;
    return this.http.patch(url, data.formData);
  }
}
