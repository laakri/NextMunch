import { EventService } from './../../services/event.service';
import { PlatService } from './../../services/plat.service';
import { GlobalService } from './../../services/_global.service';
import { Component, OnInit } from '@angular/core';
import { Plat } from 'src/app/models/plat.model';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent implements OnInit {
  eventPrice: number | null = 50;
  numberOfPersons: number | null = 2;
  startDate: Date | null = null;
  endDate: Date | null = null;
  eventName: string | null = 'Weld El Hattab';

  selectedImageIndex: number = 0;

  selectedImage: string | null =
    'https://i.gyazo.com/b36542af0a7113f07edead7ad733439d.png';

  imageArray: string[] = [
    'https://i.gyazo.com/b36542af0a7113f07edead7ad733439d.png',
    'https://i.gyazo.com/38a48cca08654c640e0c2312deb44497.png',
    'https://i.gyazo.com/9ba965999576fd5295a8bc44a3219846.png',
    'https://i.gyazo.com/aea585922385b1af33a6cc8ced47d193.png',
    'https://i.gyazo.com/187d2b398f8df7d36e63a9ea16f69ed4.png',
    'https://i.gyazo.com/b5ae1a05eadab20cf4c12cf1ffa9b714.png',
    'https://i.gyazo.com/28731088c91275e416e91f13b1c0edbe.png',
    'https://i.gyazo.com/84a0ffa682c1e6a8486e49cf01e06359.png',
    'https://i.gyazo.com/682dd298b6e0b689564f9353020d2b94.png',
  ];
  productsIds: string[] = [];
  products: Plat[] = [];
  restaurantId: string | null = '';
  constructor(
    private GlobalService: GlobalService,
    private PlatService: PlatService,
    private EventService: EventService
  ) {}

  ngOnInit() {
    this.productsIds = this.GlobalService.selectedProductIds;
    this.restaurantId = this.GlobalService.restaurantId;
    this.PlatService.getPlatsInfo(this.productsIds).subscribe((data) => {
      console.log(data);

      // Assuming data.platsInfo is an array
      this.products = data.platsInfo.map((product: any) => {
        return { ...product, selected: true };
      });
    });
    this.getSelectedProductNames();
  }
  getSelectedProductNames(): string {
    const selectedProducts = this.products.filter(
      (product) => product.selected
    );
    return selectedProducts.map((product) => product.nameP).join(' + ');
  }
  getSelectedProductPrices(): number {
    const selectedProducts = this.products.filter(
      (product) => product.selected
    );

    const totalPrice = selectedProducts.reduce(
      (accumulator, product) => accumulator + parseFloat(product.priceP),
      0
    );

    return totalPrice;
  }

  handleCheckboxChange(product: any) {
    product.selected = !product.selected;
  }
  handleImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageArray.push(reader.result as string);
        this.selectedImageIndex = this.imageArray.length - 1;
      };
      reader.readAsDataURL(file);
    }
  }
  selectImage(image: string) {
    this.selectedImage = image;
    this.selectedImageIndex = this.imageArray.indexOf(image);
  }

  onSubmit() {
    const eventData = {
      restaurantId: this.restaurantId,
      eventName: this.eventName,
      eventPrice: this.eventPrice,
      numberOfPersons: this.numberOfPersons,
      startDate: this.startDate,
      endDate: this.endDate,
      selectedImage: this.selectedImage,
      selectedProductIds: this.getSelectedProductIds(),
      totalPrice: this.getSelectedProductPrices(),
    };

    this.EventService.addEvent(eventData).subscribe(
      (response) => {
        console.log('Event added successfully:', response);
      },
      (error) => {
        console.error('Error adding event:', error);
      }
    );
  }

  getSelectedProductIds(): string[] {
    const selectedProducts = this.products.filter(
      (product) => product.selected
    );
    return selectedProducts.map((product) => product._id);
  }
}
