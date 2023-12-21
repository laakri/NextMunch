import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isAuthSubject = new BehaviorSubject<boolean>(this.isAuthenticated());

  isAuth$ = this.isAuthSubject.asObservable();

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) {}
  private isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  private updateAuthStatus() {
    this.isAuthSubject.next(this.isAuthenticated());
  }
  apiURL = 'http://localhost:4401/api/users';

  login(phone: string, password: string): void {
    const userObj = {
      phone: phone,
      password: password,
    };

    this.http.post<any>(this.apiURL + '/login', userObj).subscribe(
      (response) => {
        const token = response.token;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', response.userid);
        localStorage.setItem('userName', response.userName);
        localStorage.setItem('userRole', response.userRole);

        this.updateAuthStatus(); // Update authentication status

        const successMessage = 'Login Successfuly!';
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: successMessage,
        });
        console.log('Login response:', response);
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');

    this.updateAuthStatus();

    this.router.navigate(['/login']); // You can navigate to any desired page after logout
  }

  signup(name: string, email: string, phone: number, password: string) {
    const userObj: User = {
      _id: '',
      name: name /*this.signupForm.get('name')?.value ,*/,
      email: email /*this.signupForm.get('email')?.value ,*/,
      phone: phone /*this.signupForm.get('phone')?.value ,*/,
      password: password /*this.signupForm.get('password')?.value , */,
      isAdmin: false,
      roles: ['client'],
    };
    this.http.post<any>(this.apiURL + '/signup', userObj).subscribe(
      (response) => {
        console.log('signup response:', response);

        const successMessage = 'Signup Successful!';
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: successMessage,
        });
      },
      (error) => {
        console.error('Signup error:', error.error.error);
      }
    );
  }

  /*****************Get-Users******************** */

  getUsers(offset: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('offset', offset.toString())
      .set('limit', limit.toString());

    return this.http.get<any>(`${this.apiURL}/users`, { params });
  }

  /*****************Delete-Users******************** */

  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/delete/${userId}`);
  }
}
