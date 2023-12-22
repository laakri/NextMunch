// order.component.ts
import { Component } from '@angular/core';
import { Plat } from 'src/app/models/plat.model';
import { GlobalService } from './../../services/_global.service';
import { PlatService } from './../../services/plat.service';
import { ReservationService } from './../../services/reservation.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent {
  userName: string = '';
  userPhone: string = '';
  userLocation: string = '';
  quantities: { [platId: string]: number } = {};
  productsIds: string[] = [];
  products: Plat[] = [];
  orderedProducts: { platId: string; quantity: number }[] = [];
  restaurantId: any | null = '';
  userId: any | null = '6584b17c79bb6bbe7ce56238';
  totalOrderPrice: number = 0;

  constructor(
    private GlobalService: GlobalService,
    private PlatService: PlatService,
    private ReservationService: ReservationService
  ) {}

  ngOnInit() {
    this.productsIds = this.GlobalService.selectedProductIds;
    this.restaurantId = this.GlobalService.restaurantId;
    this.PlatService.getPlatsInfo(this.productsIds).subscribe((data) => {
      this.products = data.platsInfo;

      this.products.forEach((product) => {
        this.quantities[product._id] = 1;
      });
    });
  }

  // order.component.ts
  logOrder(): void {
    this.totalOrderPrice = this.calculateTotalPrice();

    this.orderedProducts = Object.keys(this.quantities).map((platId) => ({
      platId,
      quantity: this.quantities[platId],
    }));

    const platQuantities: { [platId: string]: number } = {};
    this.orderedProducts.forEach((item) => {
      platQuantities[item.platId] = item.quantity;
    });

    this.ReservationService.makeReservation(
      this.userId,
      this.restaurantId,
      this.userName,
      this.userPhone,
      this.userLocation,
      platQuantities,
      this.totalOrderPrice
    ).subscribe(
      (response) => {
        console.log('Reservation Successful:', response);
      },
      (error) => {
        console.error('Reservation Error:', error);
      }
    );
  }

  calculateTotalPrice(): number {
    return Object.keys(this.quantities).reduce((total, platId) => {
      const quantity = this.quantities[platId];
      const product = this.products.find((p) => p._id === platId);
      return total + (product ? product.priceP * quantity : 0);
    }, 0);
  }

  increaseQuantity(platId: string): void {
    if (this.quantities[platId]) {
      this.quantities[platId]++;
    } else {
      this.quantities[platId] = 1;
    }
  }

  decreaseQuantity(platId: string): void {
    if (this.quantities[platId] && this.quantities[platId] > 1) {
      this.quantities[platId]--;
    }
  }
}
