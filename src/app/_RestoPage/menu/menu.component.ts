import { EventService } from './../../services/event.service';
import { GlobalService } from './../../services/_global.service';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RestaurantService } from '../../services/restaurant.service';
import { Categorie } from 'src/app/models/categorie.model';
import { Plat } from 'src/app/models/plat.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';
import { AddPlatComponent } from 'src/app/_Dashboard_Resto/add-plat/add-plat.component';
import { ListeCategComponent } from 'src/app/_Dashboard_Resto/liste-categ/liste-categ.component';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [DialogService],
})
export class MenuComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  productSelectionBarVisible: boolean = false;
  productSelectionBarCartVisible: boolean = false;
  selectedProductIds: string[] = [];
  selectedProductsCart: any[] = [];
  events: any[] = [];
  plats!: Plat[];
  categories!: Categorie[];
  restaurantId!: string | null;
  constructor(
    private RestaurantService: RestaurantService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private router: Router,
    private platService: PlatService,
    private GlobalService: GlobalService,
    private EventService: EventService
  ) {}

  ngOnInit() {
    this.route.parent?.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.restaurantId = idParam;

        // Fetch data based on the restaurantId
        this.platService.getAllPlats().subscribe(
          (plats: Plat[]) => {
            this.plats = plats;
          },
          (error) => {
            console.error('Error fetching plats:', error);
          }
        );

        this.RestaurantService.getRestoCategs(this.restaurantId).subscribe(
          (response: any) => {
            this.categories = response;
          },
          (error) => {
            console.error('Error fetching categories:', error);
          }
        );
        this.EventService.getEvents(this.restaurantId).subscribe(
          (events: any) => {
            this.events = events.events;
          },
          (error) => {
            console.error('Error fetching events:', error);
          }
        );
      }
    });
  }

  /********************* */
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
  /**************************** */
  openSelectCateg() {
    this.ref = this.dialogService.open(ListeCategComponent, {
      showHeader: false,
      closable: true,
      dismissableMask: true,
      modal: true,
      draggable: false,
      resizable: false,
      styleClass: 'dialogSearch',
      width: '800px',
      height: '700px',
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
    const index = this.selectedProductIds.indexOf(product._id);

    if (index === -1) {
      this.selectedProductIds.push(product._id);
      product.selected = true;
    } else {
      this.selectedProductIds.splice(index, 1);
      product.selected = false;
    }
  }

  // Method to submit the event
  submitEvent(): void {
    this.GlobalService.selectedProductIds = this.selectedProductIds;
    this.GlobalService.restaurantId = this.restaurantId;
    this.resetForm();
    this.router.navigate(['AddEvent']);
  }
  resetForm(): void {
    this.selectedProductIds = [];

    this.productSelectionBarVisible = false;
  }
  //****************** Cart ******************* */
  showProductSelectionCartBar(): void {
    this.productSelectionBarCartVisible = true;
  }
  addToSelectedProductsCart(product: any): void {
    const index = this.selectedProductsCart.findIndex(
      (p) => p._id === product._id
    );

    if (index === -1) {
      this.selectedProductsCart.push(product);
      product.selected = true;
    } else {
      this.selectedProductsCart.splice(index, 1);
      product.selected = false;
    }
  }
  submitSelectedProducts(): void {
    const selectedProductIds = this.selectedProductsCart.map(
      (product) => product._id
    );
    this.GlobalService.selectedProductIds = selectedProductIds;
    this.GlobalService.restaurantId = this.restaurantId;

    console.log('Selected Product IDs:', selectedProductIds);
    this.ref = this.dialogService.open(OrderComponent, {
      showHeader: false,
      closable: true,
      dismissableMask: true,
      modal: true,
      draggable: false,
      resizable: false,
      styleClass: 'dialogSearch',
      width: '450px',
      height: '660px',
      contentStyle: { overflow: 'auto' },
    });
    this.ref.onClose.subscribe(() => {});
  }
}
