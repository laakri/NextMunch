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
  getAllPlats(): Observable<Plat[]> {
    return this.http.get<Plat[]>(`${this.apiUrl}/liste-plats`);
  }
  getPlatsInfo(platIds: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/getPlatsInfo`, { platIds });
  }


 
}
