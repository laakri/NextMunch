import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/*************************   Components   *********************** */

import { SignUpComponent } from './_Auth/sign-up/sign-up.component';
import { LoginComponent } from './_Auth/login/login.component';
import { HomepageComponent } from './_Client_Side/homepage/homepage.component';
import { AboutUsComponent } from './_Client_Side/about-us/about-us.component';
import { ContactUsComponent } from './_Client_Side/contact-us/contact-us.component';
import { AuthComponent } from './_Auth/auth/auth.component';
import { PageRestoComponent } from './_Client_Side/page-resto/page-resto.component';
import { RestaurantsComponent } from './_Client_Side/restaurants/restaurants.component';
/*************************   Admin Dashboard   *********************** */

import { SidebarComponent } from './_Dashboard_Admin/sidebar/sidebar.component';
import { ListAddCategoryComponent } from './_Dashboard_Admin/list-add-category/list-add-category.component';
import { ListUserComponent } from './_Dashboard_Admin/list-user/list-user.component';
import { ListRestaurantComponent } from './_Dashboard_Admin/list-restaurant/list-restaurant.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'About', component: AboutUsComponent },
  { path: 'Contact', component: ContactUsComponent },
  { path: 'PageResto/:id', component: PageRestoComponent },
  { path: 'Restaurants', component: RestaurantsComponent },
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },
  {
    path: 'Dashboard',
    component: SidebarComponent,
    children: [
      { path: '', redirectTo: '/Dashboard/ListAddCategory', pathMatch: 'full' },
      { path: 'ListAddCategory', component: ListAddCategoryComponent },
      { path: 'ListUser', component: ListUserComponent },
      { path: 'ListRestaurant', component: ListRestaurantComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
