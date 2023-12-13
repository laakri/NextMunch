import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { RestaurantService } from '../../services/restaurant.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-resto',
  templateUrl: './add-resto.component.html',
  styleUrls: ['./add-resto.component.css'],
})
export class AddRestoComponent {
  UserID: string = '6579b0041f57c8dac88c5a1a';
  cin: string = '345346346';
  restaurantName: string = 'gazgaz';
  location: string = 'gazgaz';
  contact: string = 'gazgaz';
  showErrorCin: boolean = false;
  showErrorRestaurantName: boolean = false;
  showErrorLocation: boolean = false;
  showErrorContact: boolean = false;
  items: any[];
  activeIndex: number = 0;

  loading: boolean = false;

  constructor(
    private messageService: MessageService,
    private RestaurantService: RestaurantService,
    private ref: DynamicDialogRef,
    private router: Router
  ) {
    this.items = [
      { label: 'Step 1' },
      { label: 'Step 2' },
      { label: 'Step 3' },
    ];
  }

  nextStep(inputField: string) {
    if (this.activeIndex === 0) {
      // Check if CIN is not empty
      this.showErrorCin = !this.cin || this.cin.trim() === '';
      if (!this.showErrorCin) {
        this.activeIndex++;
      }
    } else if (this.activeIndex === 1) {
      // Check for other fields and set corresponding error variables
      this.showErrorRestaurantName =
        !this.restaurantName || this.restaurantName.trim() === '';
      this.showErrorLocation = !this.location || this.location.trim() === '';
      this.showErrorContact = !this.contact || this.contact.trim() === '';

      // If all fields are valid, proceed to the next step
      if (
        !this.showErrorRestaurantName &&
        !this.showErrorLocation &&
        !this.showErrorContact
      ) {
        this.activeIndex++;
      }
    }
  }

  prevStep() {
    if (this.activeIndex > 0) {
      this.activeIndex--;
    }
  }

  createRestaurant() {
    // Reset error flags
    this.showErrorRestaurantName = false;
    this.showErrorLocation = false;
    this.showErrorContact = false;

    // Check for errors and show messages
    if (!this.restaurantName || this.restaurantName.trim() === '') {
      this.showErrorRestaurantName = true;
      console.log('Restaurant Name is required');
      return;
    }

    if (!this.location || this.location.trim() === '') {
      this.showErrorLocation = true;
      console.log('Location is required');
      return;
    }

    if (!this.contact || this.contact.trim() === '') {
      this.showErrorContact = true;
      console.log('Contact is required');
      return;
    }

    // If all checks pass, proceed to create the restaurant
    this.RestaurantService.saveRestaurant({
      ownerId: this.UserID,
      cin: this.cin,
      bannerImg: '', // Set the appropriate values for these properties
      mainImg: '', // Set the appropriate values for these properties
      nameR: this.restaurantName,
      descriptionR: '', // Set the appropriate values for these properties
      location: this.location,
      contact: this.contact,
    }).subscribe(
      (response) => {
        const createdRestaurantId = response.restaurantId; // Assuming the API returns the ID in the "restaurantId" property
        console.log(
          'Restaurant created successfully. ID:',
          createdRestaurantId
        );
        this.showMessage(createdRestaurantId);
        this.activeIndex = 2;
      },
      (error) => {
        console.error('Error creating restaurant', error);
      }
    );
  }

  // Step 3: Loading message
  showMessage(id: any) {
    // Simulate loading with p-loading
    this.loading = true;
    setTimeout(() => {
      // Hide p-loading after 3 seconds
      this.loading = false;
      this.ref.close();
      this.router.navigate(['PageResto/', id]);

      // Show success message using PrimeNG Toast
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Restaurant created successfully!',
      });
    }, 3000);
  }
}
