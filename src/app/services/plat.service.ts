import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Plat } from '../models/plat.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlatService {
  private apiUrl = 'http://localhost:4401/api/plats';

  constructor(private http: HttpClient) {}

  ajouterPlat(platData: Plat): Observable<any> {
    const formData = new FormData();

    formData.append('nameP', platData.nameP);
    formData.append('descriptionP', platData.descriptionP);
    formData.append('priceP', platData.priceP);

    for (const element of platData.categoryP) {
      formData.append('categoryP[]', element);
    }

    if (platData.imgP instanceof File) {
      formData.append('imgP', platData.imgP);
    }

    return this.http.post(this.apiUrl + '/plat', formData);
  }
  getAllPlats(restaurantId: string): Observable<Plat[]> {
    return this.http.get<Plat[]>(`${this.apiUrl}/liste-plats/${restaurantId}`);
  }
  getPlatsInfo(platIds: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/getPlatsInfo`, { platIds });
  }
  deletePlats(platIds: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/deleteArrayP`, { platIds });
  }

  setPlatsHidden(platIds: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/setPlatHidden`, { platIds });
  }
  setunPlatHidden(platIds: string | string[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/setPlatUnHidden`, { platIds });
  }

  deletePlat(platId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/plat/${platId}`);
  }
}
