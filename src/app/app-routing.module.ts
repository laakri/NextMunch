import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*************************   Components   *********************** */

import { SignUpComponent } from './_Auth/sign-up/sign-up.component';
import { LoginComponent } from './_Auth/login/login.component';
import { HomepageComponent } from './_Client_Side/homepage/homepage.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AuthComponent } from './_Auth/auth/auth.component';
import { PageRestoComponent } from './_Client_Side/page-resto/page-resto.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'About', component: AboutUsComponent },
  { path: 'Contact', component: ContactUsComponent },
  { path: 'PageResto', component: PageRestoComponent },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
