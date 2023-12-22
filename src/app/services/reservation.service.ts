// reservation.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  private apiURL = 'http://localhost:4401/api/reservations';

  constructor(private http: HttpClient) {}
  getReservations(restoId: string): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/getreservation/${restoId}`);
  }
  makeReservation(
    userId: string,
    restoId: string,
    userName: string,
    userPhone: string,
    userLocation: string,
    platQuantities: { [platId: string]: number } = {},
    totalPrice: number
  ): Observable<any> {
    // Convert platQuantities object to an array of objects for easier handling
    const platQuantitiesArray = Object.keys(platQuantities).map((platId) => ({
      platId,
      numberOfPlates: platQuantities[platId],
    }));

    const reservationData = {
      userId,
      restoId,
      userName,
      userPhone,
      userLocation,
      platQuantities: platQuantitiesArray,
      totalPrice,
    };

    return this.http.post<any>(
      `${this.apiURL}/reservation/${userId}/${restoId}`,
      reservationData
    );
  }
}
