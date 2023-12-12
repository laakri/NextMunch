import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-page-resto',
  templateUrl: './page-resto.component.html',
  styleUrls: ['./page-resto.component.css'],
})
export class PageRestoComponent implements OnInit {
  events: any[] = [1, 2, 3, 1, 2, 3, 3, 3];
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;
  ngOnInit() {
    this.items = Array.from({ length: 16 }, (_, i) => ({
      label: `Tab ${i + 1}`,
    }));
    this.activeItem = this.items[0];
  }
}
