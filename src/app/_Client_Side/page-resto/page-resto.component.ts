import { MenuItem } from 'primeng/api';
import { Restaurant } from './../../models/restaurant.model';
import { RestaurantService } from './../../services/restaurant.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddRestoComponent } from 'src/app/_Dashboard_Resto/add-resto/add-resto.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddPlatComponent } from 'src/app/_Dashboard_Resto/add-plat/add-plat.component';

@Component({
  selector: 'app-page-resto',
  templateUrl: './page-resto.component.html',
  styleUrls: ['./page-resto.component.css'],
  providers: [DialogService],
})
export class PageRestoComponent implements OnInit {
  data!: Restaurant;
  ref: DynamicDialogRef | undefined;

  productSelectionBarVisible: boolean = false;
  selectedProductIds: number[] = [];
  eventPrice: number | null = null;
  numberOfPersons: number | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;

  constructor(
    private RestaurantService: RestaurantService,
    private dialogService: DialogService,
    private route: ActivatedRoute
  ) {}
  events: any[] = [1, 2, 3, 1, 2, 3, 3, 3];

  items!: any[];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const restaurantId = params['id']; // Assuming the parameter name is 'id'

      // Check if the restaurantId is present before making the request
      if (restaurantId) {
        this.RestaurantService.getRestaurantById(restaurantId).subscribe(
          (data) => {
            this.data = data;
            console.log(data);
          }
        );
      } else {
        console.error('No restaurant ID found in route params.');
      }
    });

    this.items = [
      {
        id: 1,
        imgP: '../../../assets/—Pngtree—real beef cheese burger_6889143.png',
        name: 'Product 1',
        description: 'Short Description Short Description ',
        Price: '60.00',
      },
      {
        id: 2,
        imgP: '../../../assets/—Pngtree—real beef cheese burger_6889143.png',
        name: 'Product 2',
        description: 'Short Description Short Description ',
        Price: '60.00',
      },
      {
        id: 3,
        imgP: '../../../assets/—Pngtree—real beef cheese burger_6889143.png',
        name: 'Product 3',
        description: 'Short Description Short Description ',
        Price: '60.00',
      },
      {
        id: 4,
        imgP: '../../../assets/—Pngtree—real beef cheese burger_6889143.png',
        name: 'Product 4',
        description: 'Short Description Short Description ',
        Price: '60.00',
      },
      {
        id: 5,
        imgP: '../../../assets/—Pngtree—real beef cheese burger_6889143.png',
        name: 'Product 5',
        description: 'Short Description Short Description ',
        Price: '60.00',
      },
      {
        id: 6,
        imgP: '../../../assets/—Pngtree—real beef cheese burger_6889143.png',
        name: 'Product 6',
        description: 'Short Description Short Description ',
        Price: '60.00',
      },
      {
        id: 7,
        imgP: '../../../assets/—Pngtree—real beef cheese burger_6889143.png',
        name: 'Product 7',
        description: 'Short Description Short Description ',
        Price: '60.00',
      },
      {
        id: 7,
        imgP: '../../../assets/—Pngtree—real beef cheese burger_6889143.png',
        name: 'Product 7',
        description: 'Short Description Short Description ',
        Price: '60.00',
      },
      {
        id: 7,
        imgP: '../../../assets/—Pngtree—real beef cheese burger_6889143.png',
        name: 'Product 7',
        description: 'Short Description Short Description ',
        Price: '60.00',
      },
    ];
  }
  openAddPlat() {
    this.ref = this.dialogService.open(AddPlatComponent, {
      showHeader: false,
      closable: true,
      dismissableMask: true,
      modal: true,
      draggable: false,
      resizable: false,
      styleClass: 'dialogSearch',
      width: '700px',
      height: '600px',
      contentStyle: { overflow: 'auto' },
    });
    console.log(this.ref);
    this.ref.onClose.subscribe(() => {});
  }

  /************************** */
  showProductSelectionBar(): void {
    this.productSelectionBarVisible = true;
  }

  addToSelectedProducts(product: any): void {
    const index = this.selectedProductIds.indexOf(product.id);

    if (index === -1) {
      this.selectedProductIds.push(product.id);
      product.selected = true;
    } else {
      this.selectedProductIds.splice(index, 1);
      product.selected = false;
    }
  }
  // Method to submit the event
  submitEvent(): void {
    const eventData: any = {
      products: this.selectedProductIds,
      price: this.eventPrice,
      numberOfPersons: this.numberOfPersons,
      startDate: this.startDate,
      endDate: this.endDate,
    };

    this.resetForm();
  }

  // Method to reset the form or hide the bar
  resetForm(): void {
    this.selectedProductIds = [];
    this.eventPrice = null;
    this.numberOfPersons = null;
    this.startDate = null;
    this.endDate = null;
    this.productSelectionBarVisible = false;
  }
}
