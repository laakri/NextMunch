import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  @ViewChild('signupForm') signupForm!: NgForm;
  onSignup() {
    console.log(this.signupForm.value);
    // Do login here
  }
}
