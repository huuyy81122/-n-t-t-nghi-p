import { Component } from '@angular/core';

@Component({
  selector: 'shipper-order',
  templateUrl: './shipper-order.component.html',
  styleUrls: ['./shipper-order.component.scss']
})


export class ShipperOrderComponent {
  products: any[]; // Định nghĩa thuộc tính products
  customers : any[]
  constructor() { }

  ngOnInit(): void {
    // Khởi tạo hoặc gán giá trị cho products ở đây nếu cần
    this.products = []; // Ví dụ khởi tạo là một mảng rỗng
    this.customers = [];
  }
}
