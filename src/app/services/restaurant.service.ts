import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
  updateRestaurant(data: any): Observable<any> {
    const url = `${this.apiUrl}/UpdateRestaurant/${data.restaurantId}`;
    return this.http.patch(url, data.formData);
  }
  addCategoryToRestaurant(
    restaurantId: string,
    categoryId: string
  ): Observable<any> {
    const url = `${this.apiUrl}/restaurants/${restaurantId}/ajouter-categories`;
    return this.http.post(url, { categorie: categoryId });
  }
  getRestoCategs(restaurantId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/liste-categ/${restaurantId}`);
  }
  getAllRestaurants(): Observable<Restaurant[]> {
    return this.http.get<Restaurant[]>(`${this.apiUrl}/list`);
  }
  deleteRestaurant(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/delete/${id}`);
  }

  /*searchRestaurantsByName(searchTerm: string): Observable<Restaurant[]> {
    const url = `${this.apiUrl}/listRestoSearch?q=${searchTerm}`;
    return this.http.get<Restaurant[]>(url);
  }

searchRestaurantsByCategory(categories: Categorie[]): Observable<Restaurant[]> {
  const params = new HttpParams().set('categories', categories.join(','));
  return this.http.get<any>(`${this.apiUrl}/listRestoByCategory`, { params })
}*/

  searchRestaurants(
    searchInput: string,
    selectedCategories: Categorie[]
  ): Observable<any> {
    const params = {
      name: searchInput,
      categories: selectedCategories.join(','),
    };

    return this.http.get(`${this.apiUrl}/listRestoBySearch`, { params });
  }
}
