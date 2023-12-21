import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenuItem } from 'primeng/api';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [DialogService],

})
export class HomepageComponent implements OnInit {
 
  constructor(private restoService:RestaurantService){}
  
  Restaurants: Restaurant[] | undefined;

  items: MenuItem[] | undefined;


  ngOnInit(): void {
    this.restoService.getAllRestaurants().subscribe((resto) => {
            this.Restaurants = resto;
        },
        (error) => {
          console.error('Error loading restaurants', error);
        });
       
      }
    


}
