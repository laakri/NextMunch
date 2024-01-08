import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categorie } from 'src/app/models/categorie.model';
import { Restaurant } from 'src/app/models/restaurant.model';
import { CategorieService } from 'src/app/services/categorie.service';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { GlobalService } from 'src/app/services/_global.service';
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
  restaurantId: any = '';
  responseMessage = '';

  constructor(
    private restoService: RestaurantService,
    private categService: CategorieService,
    private route: ActivatedRoute,
    private globalService: GlobalService
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
    if (this.selectedCategory) {
      const categoryId = this.selectedCategory._id;

      this.restoService
        .addCategoryToRestaurant(this.restaurantId, categoryId)
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
  searchTerm: string = '';
  onSearchChange(): void {
    this.categories = this.categories.filter((category) =>
      category.nameCat.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  ngOnInit() {
    this.restaurantId = this.globalService.restaurantId;
    this.categService.getAllCategs().subscribe(
      (categories: Categorie[]) => {
        this.categories = categories;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
    this.route.params.subscribe((params) => {
      this.restoService.getRestoCategs(this.restaurantId).subscribe(
        (response: any) => {
          console.log(this.restaurantId);
          this.categsResto = response;
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
    });
  }
}
