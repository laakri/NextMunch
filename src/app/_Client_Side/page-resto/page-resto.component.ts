import { MenuItem } from 'primeng/api';
import { Restaurant } from './../../models/restaurant.model';
import { RestaurantService } from './../../services/restaurant.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-resto',
  templateUrl: './page-resto.component.html',
  styleUrls: ['./page-resto.component.css'],
})
export class PageRestoComponent implements OnInit {
  data!: Restaurant;
  constructor(private RestaurantService: RestaurantService) {}
  events: any[] = [1, 2, 3, 1, 2, 3, 3, 3];
  items: MenuItem[] | undefined;

  activeItem: MenuItem | undefined;
  ngOnInit() {
    this.RestaurantService.getRestaurantById(
      '6579b33687177debc1b35af8'
    ).subscribe((data) => {
      this.data = data;
      console.log(data);
    });
    this.items = Array.from({ length: 16 }, (_, i) => ({
      label: `Tab ${i + 1}`,
    }));
    this.activeItem = this.items[0];
  }
}
