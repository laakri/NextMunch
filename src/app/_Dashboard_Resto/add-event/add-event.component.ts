import { Component } from '@angular/core';
import { Plat } from 'src/app/models/plat.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent {
  eventPrice: number | null = null;
  numberOfPersons: number | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;

  // New properties for image selection
  selectedImage: string | null =
    'https://i.gyazo.com/aea585922385b1af33a6cc8ced47d193.png';
  imageArray: string[] = [
    'https://i.gyazo.com/aea585922385b1af33a6cc8ced47d193.png',
    'https://i.gyazo.com/187d2b398f8df7d36e63a9ea16f69ed4.png',
    'https://i.gyazo.com/b5ae1a05eadab20cf4c12cf1ffa9b714.png',
    'https://i.gyazo.com/aea585922385b1af33a6cc8ced47d193.png',
    'https://i.gyazo.com/aea585922385b1af33a6cc8ced47d193.png',
  ];
  products: any[] = [
    {
      nameP: 'Product 1',
      descriptionP: 'Description for Product 1',
      imgP: null,
      priceP: '10.99',
      selected: true,
    },
    {
      nameP: 'Product 2',
      descriptionP: 'Description for Product 2',
      imgP: null,
      priceP: '15.99',
      selected: true,
    },
    {
      nameP: 'Product 3',
      descriptionP: 'Description for Product 3',
      imgP: null,
      priceP: '20.99',
      selected: true,
    },
    {
      nameP: 'Product 4',
      descriptionP: 'Description for Product 4',
      imgP: null,
      priceP: '8.99',
      selected: true,
    },
  ];
  handleCheckboxChange(product: any) {
    product.selected = !product.selected;
  }
  handleImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }
}
