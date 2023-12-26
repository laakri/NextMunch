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
  public isAuthSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isOwnerSubject = new BehaviorSubject<boolean>(this.isOwner());
  public isAdminSubject = new BehaviorSubject<boolean>(this.isAdmin());

  isAuth$ = this.isAuthSubject.asObservable();
  isOwner$ = this.isOwnerSubject.asObservable();
  isAdmin$ = this.isAdminSubject.asObservable();
  UserID: any = '';
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  private updateAuthStatus() {
    this.isAuthSubject.next(this.isAuthenticated());
  }

  public isOwner(): boolean {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'owner';
  }

  public isAdmin(): boolean {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'admin';
  }

  private updateOwnerStatus() {
    this.isOwnerSubject.next(this.isOwner());
  }

  private updateAdminStatus() {
    this.isAdminSubject.next(this.isAdmin());
  }
  getUserId(): string | null {
    if (this.UserID) {
      return this.UserID;
    }
    const storedUserId = localStorage.getItem('userId');

    if (storedUserId) {
      this.UserID = storedUserId;
      return this.UserID;
    }
    return null;
  }

  apiURL = 'http://localhost:4401/api/users';

  login(phone: string, password: string): void {
    const userObj = {
      phone: phone,
      password: password,
    };

    this.http.post<any>(this.apiURL + '/login', userObj).subscribe(
      (response) => {
        console.log('Login response:', response);

        const token = response.token;
        localStorage.setItem('token', token);
        localStorage.setItem('userId', response.userId);
        localStorage.setItem('userName', response.userName);
        localStorage.setItem('userRole', response.userRole);

        // Update the UserID property
        this.UserID = response.userId;

        this.updateAuthStatus();
        this.updateOwnerStatus();
        this.updateAdminStatus();

        // Check if the user's role is now "owner" and update isOwner$ accordingly
        if (response.userRole === 'owner') {
          this.isOwnerSubject.next(true);
        } else {
          this.isOwnerSubject.next(false);
        }

        const successMessage = 'Login Successfully!';
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: successMessage,
        });
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
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
