import { GlobalService } from './../../services/_global.service';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-page-resto',
  templateUrl: './page-resto.component.html',
  styleUrls: ['./page-resto.component.css'],
})
export class PageRestoComponent implements OnInit {
  data!: Restaurant;
  restaurantId: string = '';
  ratingValue: number = 4.5;
  loading: boolean = true;
  constructor(
    private RestaurantService: RestaurantService,
    private route: ActivatedRoute,
    private GlobalService: GlobalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params) => {
      this.restaurantId = params['id']; // Assuming the parameter name is 'id'

      // Check if the restaurantId is present before making the request
      if (this.restaurantId) {
        this.RestaurantService.getRestaurantById(this.restaurantId).subscribe(
          (data) => {
            this.data = data;
            this.loading = false;
          }
        );
      } else {
        console.error('No restaurant ID found in route params.');
      }
    });
  }

  OpenSettings() {
    this.GlobalService.restaurantId = this.restaurantId;
    this.router.navigate(['RestoSettings']);
  }
}
