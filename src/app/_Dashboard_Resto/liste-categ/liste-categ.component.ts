import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categorie } from 'src/app/models/categorie.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-liste-categ',
  templateUrl: './liste-categ.component.html',
  styleUrls: ['./liste-categ.component.css'],
})
export class ListeCategComponent implements OnInit {
  categories: Categorie[] = [];
  categsResto: Categorie[] = [];

  selectedCategory: Categorie | null = null; // Change this line
  categSelected: boolean = false;

  responseMessage = '';

  constructor(
    private restoService: RestaurantService,
    private categService: CategorieService,
    private route: ActivatedRoute

  ) {}

  onCategoryClick(category: Categorie) {
    this.categories.forEach((cat) => (cat.isSelected = false));

    // Set the clicked category as selected
    category.isSelected = true;

    // Log the selected category to the console
    console.log('Selected Category:', category);
    this.selectedCategory = category;
  }


  addCategory(): void {
    const restaurantId = '6581589f5d0bb7020fc6302f';

    if (this.selectedCategory) {
      const categoryId = this.selectedCategory._id;

      this.restoService
        .addCategoryToRestaurant(restaurantId, categoryId)
        .subscribe(
          (response) => {
            this.responseMessage = response.message;
            console.log('Category added successfully:', response);
          },
          (error) => {
            this.responseMessage =
              "Une erreur s'est produite lors de l'ajout de la catégorie.";
            console.error('Error adding category:', error);
          }
        );
    } else {
      console.warn('Aucune catégorie sélectionnée.');
    }
  }
  loading: boolean = true;
  data!: Restaurant;

  ngOnInit() {
    const restaurantId = '6581589f5d0bb7020fc6302f';

    this.categService.getAllCategs().subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
    this.route.params.subscribe((params) => {
      const restaurantId = "6581589f5d0bb7020fc6302f"; // Assuming the parameter name is 'id'
      this.restoService.getRestoCategs(restaurantId).subscribe(
        (response: any) => {
          console.log(restaurantId);
          this.categsResto = response;
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
    
    });

  }
}
