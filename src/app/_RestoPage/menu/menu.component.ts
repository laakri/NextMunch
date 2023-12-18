import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { RestaurantService } from '../../services/restaurant.service';
import { Categorie } from 'src/app/models/categorie.model';
import { Plat } from 'src/app/models/plat.model';
import { ActivatedRoute } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';
import { CategorieService } from 'src/app/services/categorie.service';
import { AddPlatComponent } from 'src/app/_Dashboard_Resto/add-plat/add-plat.component';
import { ListeCategComponent } from 'src/app/_Dashboard_Resto/liste-categ/liste-categ.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  providers: [DialogService],
})
export class MenuComponent implements OnInit {
  ref: DynamicDialogRef | undefined;
  productSelectionBarVisible: boolean = false;
  selectedProductIds: number[] = [];
  eventPrice: number | null = null;
  numberOfPersons: number | null = null;
  startDate: Date | null = null;
  endDate: Date | null = null;
  events: any[] = [1, 2, 3, 1, 2, 3, 3, 3];
  plats!: Plat[];
  categories!: Categorie[];
  constructor(
    private RestaurantService: RestaurantService,
    private dialogService: DialogService,
    private route: ActivatedRoute,
    private platService: PlatService,
    private categService: CategorieService
  ) {}

  ngOnInit() {
    //Restaurant Id Ya Rojla
    const restaurantId = this.route.snapshot.paramMap.get('id');

    this.platService.getAllPlats().subscribe(
      (plats: Plat[]) => {
        this.plats = plats;
      },
      (error) => {
        console.error('Error fetching plats:', error);
      }
    );

    this.RestaurantService.getRestoCategs().subscribe(
      (response: any) => {
        this.categories = response;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
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
      width: '1300px',
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
