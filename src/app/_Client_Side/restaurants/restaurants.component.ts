import { Component } from '@angular/core';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { Categorie } from 'src/app/models/categorie.model';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css'],
})
export class RestaurantsComponent {
  restaurants: Restaurant[] = [];
  selectedCategories: Categorie[] = [];
  maxRating: number = 5; // Set a default max rating

  categories: Categorie[] = [];

  
  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (data) => {
        this.categories = data;
        console.log(data);
        
      },
      (error) => {
        console.error('Error loading categories', error);
      }
    );
  }
  constructor(private restaurantService: RestaurantService , private categoryService: CategorieService) {}

  ngOnInit(): void {
    this.loadRestaurants();
    this.loadCategories();
  }

  loadRestaurants() {
    this.restaurantService.getAllRestaurants().subscribe(
      (data) => {
        this.restaurants = data;
        console.log(this.restaurants);
      },
      (error) => {
        console.error('Error loading restaurants', error);
      }
    );
  }
  searchInput: string = '';




/* searchRestaurants() {
  if (this.searchInput.trim() !== '') {
    this.restaurantService.searchRestaurantsByName(this.searchInput).subscribe(
      (data) => {
        this.restaurants = data;
      },
      (error) => {
        console.error('Error searching restaurants', error);
      }
    );
  }
}


searchRestaurantsc() {
  if (this.selectedCategories.length > 0) {
    this.restaurantService.searchRestaurantsByCategory( this.selectedCategories).subscribe(
      (data) => {
        this.restaurants = data;
      },
      (error) => {
        console.error('Error searching restaurants', error);
      }
    );
  } else {
    this.loadRestaurants();
  }
}
*/
searchRestaurantsf(): void {
  this.restaurantService
    .searchRestaurants(this.searchInput, this.selectedCategories)
    .subscribe((data) => {
      this.restaurants = data;
    });
}


}
