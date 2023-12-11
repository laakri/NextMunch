import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*************************   Components   *********************** */

import { SignUpComponent } from './_Auth/sign-up/sign-up.component';
import { LoginComponent } from './_Auth/login/login.component';
import { HomepageComponent } from './_Client_Side/homepage/homepage.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'SignUp', component: SignUpComponent },
  { path: 'Login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
