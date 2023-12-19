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
    'https://i.gyazo.com/aea585922385b1af33a6cc8ced47d193.png',
    'https://i.gyazo.com/aea585922385b1af33a6cc8ced47d193.png',
    'https://i.gyazo.com/aea585922385b1af33a6cc8ced47d193.png',
    'https://i.gyazo.com/aea585922385b1af33a6cc8ced47d193.png',
    'https://i.gyazo.com/aea585922385b1af33a6cc8ced47d193.png',
  ];
  products: any[] = [
    {
      nameP: 'Fake Product 1',
      descriptionP: 'Description for Fake Product 1',
      imgP: null,
      priceP: '10.99',
      selected: true,
    },
    {
      nameP: 'Fake Product 2',
      descriptionP: 'Description for Fake Product 2',
      imgP: null,
      priceP: '15.99',
      selected: true,
    },
    {
      nameP: 'Fake Product 3',
      descriptionP: 'Description for Fake Product 3',
      imgP: null,
      priceP: '20.99',
      selected: true,
    },
    {
      nameP: 'Fake Product 4',
      descriptionP: 'Description for Fake Product 4',
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
