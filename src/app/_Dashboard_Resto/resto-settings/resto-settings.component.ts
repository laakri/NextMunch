import { Component } from '@angular/core';

@Component({
  selector: 'app-resto-settings',
  templateUrl: './resto-settings.component.html',
  styleUrls: ['./resto-settings.component.css'],
})
export class RestoSettingsComponent {
  openDates: string[] = [];
  closeDates: string[] = [];
  mainImgFile: File | undefined;
  bannerImgFile: File | undefined;
  nameR: string | undefined;
  descriptionR: string | undefined;
  location: string | undefined;
  contact: string | undefined;
  openTime: string | undefined;
  closeTime: string | undefined;
  mainImg: string | undefined;
  bannerImg: string | undefined;

  // New method to add open and close dates
  addOpenCloseDates(openDate: string, closeDate: string) {
    this.openDates.push(openDate);
    this.closeDates.push(closeDate);
  }

  // Updated method to handle Main Image
  handleMainImgChange(event: any) {
    const file = event.target.files[0];
    this.displayMainImg(file);
  }
  displayMainImg(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.mainImg = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  // Updated method to handle Main Image

  handleBannerImgChange(event: any) {
    const file = event.target.files[0];
    this.displayBannerImg(file);
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
    const updatedData = {
      bannerImg: this.bannerImgFile,
      mainImg: this.mainImgFile,
      nameR: this.nameR,
      descriptionR: this.descriptionR,
      location: this.location,
      contact: this.contact,
      openDates: this.openDates,
      closeDates: this.closeDates,
      openTime: this.openTime, // Add this line
      closeTime: this.closeTime, // Add this line
    };
    console.log(updatedData);
    // Call your service to update the restaurant data
  }
}
