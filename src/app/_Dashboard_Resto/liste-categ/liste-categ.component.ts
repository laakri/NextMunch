import { Component, OnInit } from '@angular/core';

import { Categorie } from 'src/app/models/categorie.model';
import { CategorieService } from 'src/app/services/categorie.service';

@Component({
  selector: 'app-liste-categ',
  templateUrl: './liste-categ.component.html',
  styleUrls: ['./liste-categ.component.css']
})
export class ListeCategComponent implements OnInit {
  categories!: Categorie[];
  selectedCategories: Categorie[] = [];

  constructor(private categService: CategorieService) {}

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

  
  save() {
    // Affichez les catégories sélectionnées dans la console avant de les envoyer à la base de données
    console.log('Selected Categories:', this.selectedCategories);

    // Vous pouvez maintenant ajouter la logique d'envoi à la base de données ici

    // Réinitialisez la liste des catégories sélectionnées après l'affichage
    this.selectedCategories = [];
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
