// review.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private apiUrl = 'http://localhost:4401/api/reviews';
  constructor(private http: HttpClient) {}

  submitRating(
    userId: string,
    restoId: string,
    rating: number,
    text: string
  ): Observable<any> {
    const body = { rating, text };

    return this.http.post<any>(
      `${this.apiUrl}/rating/${userId}/${restoId}`,
      body
    );
  }
  getRestaurantRating(restoId: string): Observable<any> {
    const url = `${this.apiUrl}/getrating/${restoId}`;
    return this.http.get<any>(url);
  }

  getRatingsCount(restoId: string): Observable<any> {
    const url = `${this.apiUrl}/restaurants/${restoId}/ratings-count`;
    return this.http.get<any>(url);
  }

  getRatingAndCount(restoId: string): Observable<any> {
    const url = `${this.apiUrl}/restaurants/${restoId}/rating-and-count`;
    return this.http.get<any>(url);
  }
}
