import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  constructor(public userService: UserService) {}
  onSubmit() {
    console.log(this.loginForm.value);
    this.userService.login(
      this.loginForm.value.phone,
      this.loginForm.value.password
    );
  }
}
