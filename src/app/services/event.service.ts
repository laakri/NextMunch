import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private apiUrl = 'http://localhost:4401/api/events';

  constructor(private http: HttpClient) {}

  addEvent(eventData: any): Observable<any> {
    const url = `${this.apiUrl}/addEvent`;
    return this.http.post(url, eventData);
  }
  getEvents(restaurantId: string): Observable<any> {
    const url = `${this.apiUrl}/getEvents/${restaurantId}`;
    return this.http.get(url);
  }
}
