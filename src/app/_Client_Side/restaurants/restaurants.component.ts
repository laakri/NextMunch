import { Component } from '@angular/core';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent {
  ratingValue: number = 4;
  restaurants = Array(6).fill({
    name: 'Chaneb',
     location: 'Chaneb Eni 90, Tunisie',
      description: 'Chaneb Eni 90, Tunisie  pas encore assez de notes sur ses plats, son service, son rapport qualité/prix ou son ambiance. Écrivezun des premiers avis !',
    // Ajoutez d'autres restaurants si nécessaire
  });  
}
