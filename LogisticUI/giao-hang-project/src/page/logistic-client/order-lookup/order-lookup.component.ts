import { Component } from '@angular/core';

@Component({
  selector: 'app-order-lookup',
  templateUrl: './order-lookup.component.html',
  styleUrl: './order-lookup.component.scss'
})
export class OrderLookupComponent {
  orderCode: string = '';

  searchOrder() {
    if (this.orderCode) {
      console.log('Searching for order:', this.orderCode);
      // Add logic to search for the order using the orderCode
    } else {
      console.log('Please enter an order code');
    }
  }
}
