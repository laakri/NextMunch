import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router
  ) {}
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

        const successMessage = 'Login Successfuly !';
        this.messageService.add({
          severity: 'success',
          summary: 'Success Message',
          detail: successMessage,
        });
        console.log('Login response:', response);
        console.log('hii loginn ');
        //this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Login error:', error);
      }
    );
  }

  signup(name: string, email: string, phone: number, password: string) {
    const userObj: User = {
      name: name /*this.signupForm.get('name')?.value ,*/,
      email: email /*this.signupForm.get('email')?.value ,*/,
      phone: phone /*this.signupForm.get('phone')?.value ,*/,
      password: password /*this.signupForm.get('password')?.value , */,
      isAdmin: false,
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
        // this.router.navigate(['']);
      },
      (error) => {
        console.error('Signup error:', error.error.error);
      }
    );
  }
}
