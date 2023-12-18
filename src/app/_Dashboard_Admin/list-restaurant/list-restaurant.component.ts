import { Component } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { ViewChild } from '@angular/core';
import { Table } from 'primeng/table';


@Component({
  selector: 'app-list-restaurant',
  templateUrl: './list-restaurant.component.html',
  styleUrls: ['./list-restaurant.component.css']
})
export class ListRestaurantComponent {
  searchTerm: string = ''; // Add this line

  // Add a ViewChild for the table
  @ViewChild('dt') table!: Table;

  // Add this method to filter restaurants
  filterRestaurants() {
    this.table.filter(this.searchTerm, 'nameR', 'contains');
  }

  restaurants: Restaurant[] = [];

  constructor(private restaurantService: RestaurantService ) { }

 
  ngOnInit(): void {
    this.loadRestaurants();
  }
  /*loadRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      (data) => {
        this.restaurants = data;
        console.log(this.restaurants);
        
      },
      (error) => {
        console.error('Error loading restaurants', error);
      }
    );
  }*/


loadRestaurants() {
  this.restaurantService.getAllRestaurants().subscribe(
    (data) => {
      this.restaurants = data;
      console.log(this.restaurants);
      this.filterRestaurants(); // Call the filter method after loading data

    },
    (error) => {
      console.error('Error loading restaurants', error);
    }
  );
}

onDeleteRestaurant(id: string) {
  this.restaurantService.deleteRestaurant(id).subscribe(
    () => {
      console.log('Restaurant deleted successfully');
      // Refresh the list of restaurants after deletion
      this.loadRestaurants();
    },
    (error) => {
      console.error('Error deleting restaurant', error);
    }
  );
}
}
