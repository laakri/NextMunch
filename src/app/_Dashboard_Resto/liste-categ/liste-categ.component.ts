import { Component, OnInit } from '@angular/core';
import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
@Component({
  selector: 'app-liste-categ',
  templateUrl: './liste-categ.component.html',
  styleUrls: ['./liste-categ.component.css'],
})
export class ListeCategComponent implements OnInit {
  categories!: Categorie[];
  selectedCategories: Categorie[] = [];

  constructor(
    private restoService: RestaurantService,
    private categService: CategorieService
  ) {}

  toggleCategory(category: Categorie) {
    const index = this.selectedCategories.findIndex((c) => c === category);

    if (index === -1) {
      this.selectedCategories.push(category);
    } else {
      this.selectedCategories.splice(index, 1);
    }
  }

  isCategorySelected(category: Categorie): boolean {
    return this.selectedCategories.includes(category);
  }

  responseMessage: string = '';

  addCategory(): void {
    const restaurantId = '657f424f039fab1ba487503b';

    // Vérifiez s'il y a au moins une catégorie sélectionnée
    if (this.selectedCategories.length > 0) {
      const categoryId = this.selectedCategories[0]._id;
      // Supposons que l'ID de la catégorie est stocké dans une propriété appelée "id"

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
      // Gérez le cas où aucune catégorie n'est sélectionnée
      console.warn('Aucune catégorie sélectionnée.');
    }
  }

  ngOnInit() {
    this.categService.getAllCategs().subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
}
