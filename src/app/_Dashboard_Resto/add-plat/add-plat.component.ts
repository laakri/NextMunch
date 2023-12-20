import { Component, OnInit } from '@angular/core';
import { Plat } from 'src/app/models/plat.model';
import { PlatService } from 'src/app/services/plat.service';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-add-plat',
  templateUrl: './add-plat.component.html',
  styleUrls: ['./add-plat.component.css'],
})
export class AddPlatComponent implements OnInit {
  cities: City[] = [];
  selectedCatgorys: City[] = [];

  platData: Plat = {
    _id: '',
    nameP: '',
    descriptionP: '',
    imgP: null,
    categoryP: [],
    priceP: '',
  };

  constructor(private platService: PlatService) {}

  ngOnInit() {
    this.cities = [
      { name: 'FastFood', code: '657b685088f8a15a4d2986a8' },
      { name: 'Dessert', code: '657b685088f8a15a4d2986a8' },
      { name: 'SPicy', code: 'LDN' },
      { name: 'tunisienne', code: 'IST' },
      { name: 'Algerienne', code: 'PRS' },
    ];
  }

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    const selectedCategorys = this.selectedCatgorys.map(
      (category: any) => category.code
    );

    if (this.selectedFile) {
      this.platData.imgP = this.selectedFile;
    }

    this.platData.categoryP = selectedCategorys;
    this.platService.ajouterPlat(this.platData).subscribe(
      (response) => {
        console.log('Plat enregistré avec succès:', response);
      },
      (error) => {
        console.error("Erreur lors de l'enregistrement du plat:", error);
        // Gérez ici les erreurs
      }
    );
  }
}
