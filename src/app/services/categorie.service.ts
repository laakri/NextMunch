import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Categorie } from '../models/categorie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
private apiUrl='http://localhost:4401/api/categories';

  constructor(private http:HttpClient) { }

  getAllCategs(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/liste-categ`);
  }
}
