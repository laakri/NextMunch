import { Component, OnInit } from '@angular/core';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-resto-settings',
  templateUrl: './resto-settings.component.html',
  styleUrls: ['./resto-settings.component.css'],
})
export class RestoSettingsComponent implements OnInit {
  mainImgFile!: File;
  bannerImgFile!: File;
  nameR: string | undefined;
  descriptionR: string | undefined;
  location: string | undefined;
  contact: string | undefined;
  openDates: string | undefined;
  closeDates: string | undefined;
  mainImg: any | undefined;
  bannerImg: any | undefined;
  loading: boolean = true;
  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
    this.loading = true;

    this.restaurantService
      .getRestaurantById('6580aae27cafdfc6160456dd')
      .subscribe(
        (restaurant) => {
          console.log(restaurant);
          this.nameR = restaurant.nameR || '';
          this.descriptionR = restaurant.descriptionR || '';
          this.location = restaurant.location || '';
          this.contact = restaurant.contact || '';
          this.mainImg = restaurant.mainImg || '';
          this.bannerImg = restaurant.bannerImg || '';
          this.openDates = restaurant.openDates || '';
          this.closeDates = restaurant.closeDates || '';
          this.loading = false;
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
  }

  // Updated method to handle Main Image
  handleMainImgChange(event: any) {
    this.mainImgFile = event.target.files[0];
    this.displayMainImg(this.mainImgFile);
  }

  displayMainImg(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.mainImg = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Updated method to handle Banner Image
  handleBannerImgChange(event: any) {
    this.bannerImgFile = event.target.files[0];
    this.displayBannerImg(this.bannerImgFile);
  }

  displayBannerImg(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.bannerImg = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Updated method to submit changes, including open and close dates
  submitChanges() {
    const formData = new FormData();
    formData.append('nameR', this.nameR || '');
    formData.append('descriptionR', this.descriptionR || '');
    formData.append('location', this.location || '');
    formData.append('contact', this.contact || '');
    formData.append('openDates', this.openDates || '');
    formData.append('closeDates', this.closeDates || '');

    // Append other form data as needed

    if (this.bannerImgFile) {
      formData.append('bannerImg', this.bannerImgFile, this.bannerImgFile.name);
    }

    if (this.mainImgFile) {
      formData.append('mainImg', this.mainImgFile, this.mainImgFile.name);
    }

    this.restaurantService
      .updateRestaurant({
        restaurantId: '6580aae27cafdfc6160456dd',
        formData,
      })
      .subscribe(
        (response) => {
          console.log(response);
          // Handle success
        },
        (error) => {
          console.error(error);
          // Handle error
        }
      );
  }
}
