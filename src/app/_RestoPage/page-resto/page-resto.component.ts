import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-page-resto',
  templateUrl: './page-resto.component.html',
  styleUrls: ['./page-resto.component.css'],
})
export class PageRestoComponent implements OnInit {
  data!: Restaurant;

  ratingValue: number = 4.5;

  constructor(
    private RestaurantService: RestaurantService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const restaurantId = params['id']; // Assuming the parameter name is 'id'

      // Check if the restaurantId is present before making the request
      if (restaurantId) {
        this.RestaurantService.getRestaurantById(restaurantId).subscribe(
          (data) => {
            this.data = data;
            console.log(data);
          }
        );
      } else {
        console.error('No restaurant ID found in route params.');
      }
    });
  }
}
