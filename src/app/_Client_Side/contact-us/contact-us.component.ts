import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

interface City {
    name: string;
    code: string;
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  cities!: City[];
  formGroup!: FormGroup;
  loading: boolean = false; // Ajout de la propriété loading ici

  ngOnInit() {
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];

    this.formGroup = new FormGroup({
      selectedCities: new FormControl<City[] | null>([{ name: 'Istanbul', code: 'IST' }])
    });
  }

  load() {
    this.loading = true;

    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
