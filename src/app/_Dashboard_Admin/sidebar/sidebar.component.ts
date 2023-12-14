// sidebar.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  sidebarVisible: boolean = false;

  menuItems = [
    {
      label: 'Add Category',
      icon: 'pi pi-fw pi-plus',
      routerLink: ['/Dashboard/ListAddCategory'],
    },
    {
      label: 'List Users',
      icon: 'pi pi-fw pi-list',
      routerLink: ['/Dashboard/ListUser'],
    },
    {
      label: 'List Restaurants',
      icon: 'pi pi-fw pi-list',
      routerLink: ['/Dashboard/ListRestaurant'],
    },
  ];
}
