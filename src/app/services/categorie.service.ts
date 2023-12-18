import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Categorie } from '../models/categorie.model';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {
  private apiUrl = 'http://localhost:4401/api/categorie';


  constructor(private http: HttpClient) { }

  private categoryListUpdated$ = new Subject<void>();


  addCategory(categoryData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/add`, categoryData).pipe(
      tap(() => {
        this.categoryListUpdated$.next();
      })
    );
  }

  getCategoryListUpdatedObservable(): Observable<void> {
    return this.categoryListUpdated$.asObservable();
  }


  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/list');
  }
  deleteSelectedCategories(categoryIds: string[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/delete`, { categoryIds });



 /* getAllCategs(): Observable<Categorie[]> {
    return this.http.get<Categorie[]>(`${this.apiUrl}/liste-categ`);
  }*/
}
}