import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../../services/_global.service';
import { Restaurant } from '../../models/restaurant.model';
import { RestaurantService } from '../../services/restaurant.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../services/user.service';

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
  isOwner: boolean = false;
  UserID: any = '';
  isAuth: boolean = false;
  isTheOwner: boolean = false;

  constructor(
    private RestaurantService: RestaurantService,
    private route: ActivatedRoute,
    private GlobalService: GlobalService,
    private router: Router,
    private UserService: UserService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.UserService.isOwner$.subscribe((isOwner) => {
      this.isOwner = isOwner;
    });

    this.UserService.isAuth$.subscribe((isAuth) => {
      this.isAuth = isAuth;
      if (this.isAuth) {
        this.UserID = this.UserService.getUserId();
      }
    });

    this.route.params.subscribe((params) => {
      this.restaurantId = params['id'];

      if (this.restaurantId) {
        this.RestaurantService.getRestaurantById(this.restaurantId).subscribe(
          (data) => {
            this.data = data;
            this.isTheOwner = this.isAuth && this.UserID === this.data.ownerId;

            // Save isTheOwner in GlobalService
            this.GlobalService.isTheOwner = this.isTheOwner;

            console.log('Is the owner:', this.isTheOwner);
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
