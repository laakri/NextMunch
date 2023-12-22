import { ActivatedRoute } from '@angular/router';
import { ReservationService } from './../../services/reservation.service';
import { Component } from '@angular/core';

interface Reservation {
  orderDate: Date;
  userName: string;
  location: string;
  phone: string;
  price: number;
  products: { name: string; quantity: number }[];
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css'],
})
export class ReservationsComponent {
  constructor(
    private reservationService: ReservationService,
    private route: ActivatedRoute
  ) {}
  restaurantId!: string | null;
  reservations: Reservation[] = [];

  ngOnInit(): void {
    this.route.parent?.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.restaurantId = idParam;
        this.getReservations(this.restaurantId);
      }
    });
  }

  getReservations(restoId: any): void {
    // Replace 'yourRestoId' with the actual restoId or fetch it dynamically

    this.reservationService.getReservations(restoId).subscribe(
      (data) => {
        console.log(data);
        this.reservations = data.reservations;
      },
      (error) => {
        console.error('Error fetching reservations:', error);
        // Handle the error as needed
      }
    );
  }
}
