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

  createRestaurant(
    ownerId: string,
    cin: string,
    nameR: string,
    location: string,
    contact: string
  ) {
    const body = { ownerId, cin, nameR, location, contact };
    console.log(body);
    return this.http.post<any>(`${this.apiUrl}/restaurants`, body);
  }
  getRestaurantById(restaurantId: string): Observable<Restaurant> {
    const url = `${this.apiUrl}/restaurant/${restaurantId}`;
    return this.http.get<Restaurant>(url);
  }
}
