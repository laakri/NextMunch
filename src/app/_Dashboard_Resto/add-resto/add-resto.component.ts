import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RestaurantService } from '../../services/restaurant.service';

@Component({
  selector: 'app-add-resto',
  templateUrl: './add-resto.component.html',
  styleUrls: ['./add-resto.component.css'],
})
export class AddRestoComponent {
  UserID: string = '6579b0041f57c8dac88c5a1a';
  cin!: string;
  restaurantName!: string;
  location!: string;
  contact!: string;

  items: any[];
  activeIndex: number = 0;

  loading: boolean = false;

  constructor(
    private messageService: MessageService,
    private RestaurantService: RestaurantService
  ) {
    this.items = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ];
  }

  nextStep() {
    if (this.activeIndex === 0) {
      // Check if CIN is not empty
      if (this.cin && this.cin.trim() !== '') {
        this.activeIndex++;
      } else {
        // Show a message or perform some action for invalid input
        console.log('CIN is required');
      }
    } else if (this.activeIndex === 1) {
      // No need for checks here as "Create" button will handle it
      // You can optionally add validation here if needed
      this.activeIndex++;
    }
  }

  prevStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  createRestaurant() {
    if (
      this.restaurantName &&
      this.restaurantName.trim() !== '' &&
      this.location &&
      this.location.trim() !== '' &&
      this.contact &&
      this.contact.trim() !== ''
    ) {
      this.RestaurantService.createRestaurant(
        this.UserID,
        this.cin,
        this.restaurantName,
        this.location,
        this.contact
      );
    } else {
      console.log('Restaurant Name, Location, and Contact are required');
    }
  }

  simulateLoading() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }

  showMessage() {
    this.messageService.add({
      severity: 'info',
      summary: 'Information',
      detail: 'This is a PrimeNG message!',
    });
  }
}
