import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Order {
  id: number;
  trackingCode: string;
  customer: string;
  orderDate: string;
  shipper: number | null;
  status: string;
}

interface Shipper {
  id: number;
  name: string;
  phone: string;
  avatar: string;
}

@Component({
  selector: 'app-manager-order',
  templateUrl: './manager-order.component.html',
  styleUrls: ['./manager-order.component.scss']
})
export class ManagerOrderComponent implements OnInit {
  orders: Order[] = [];
  itemsPerPage = 7;
  p = 1;

  constructor(private router: Router) {
    // Khởi tạo dữ liệu đơn hàng (thay bằng dữ liệu thực tế của bạn)
    this.orders = [
      { id: 1, trackingCode: 'DH001', customer: 'Nguyễn Văn A', orderDate: '2024-07-15', shipper: null, status: 'pending' },
      { id: 2, trackingCode: 'DH002', customer: 'Trần Thị B', orderDate: '2024-07-16', shipper: null, status: 'processing' },
      { id: 1, trackingCode: 'DH001', customer: 'Nguyễn Văn A', orderDate: '2024-07-15', shipper: null, status: 'pending' },
      { id: 2, trackingCode: 'DH002', customer: 'Trần Thị B', orderDate: '2024-07-16', shipper: null, status: 'processing' },
      { id: 1, trackingCode: 'DH001', customer: 'Nguyễn Văn A', orderDate: '2024-07-15', shipper: null, status: 'pending' },
      { id: 2, trackingCode: 'DH002', customer: 'Trần Thị B', orderDate: '2024-07-16', shipper: null, status: 'processing' },
      { id: 1, trackingCode: 'DH001', customer: 'Nguyễn Văn A', orderDate: '2024-07-15', shipper: null, status: 'pending' },
      { id: 2, trackingCode: 'DH002', customer: 'Trần Thị B', orderDate: '2024-07-16', shipper: null, status: 'processing' },
      { id: 1, trackingCode: 'DH001', customer: 'Nguyễn Văn A', orderDate: '2024-07-15', shipper: null, status: 'pending' },
      { id: 2, trackingCode: 'DH002', customer: 'Trần Thị B', orderDate: '2024-07-16', shipper: null, status: 'processing' },
      { id: 1, trackingCode: 'DH001', customer: 'Nguyễn Văn A', orderDate: '2024-07-15', shipper: null, status: 'pending' },
      { id: 2, trackingCode: 'DH002', customer: 'Trần Thị B', orderDate: '2024-07-16', shipper: null, status: 'processing' },
      // Thêm các dữ liệu đơn hàng khác ở đây
    ];
  }

  ngOnInit(): void {}

  getShipperName(shipperId: number | null): string {
    // Thay bằng logic lấy tên shipper từ ID của bạn
    return shipperId ? `Shipper ${shipperId}` : 'Chưa chọn';
  }

  openShipperSelection(order: Order) {
    this.router.navigate(['/shipper-selection'], { state: { orderId: order.id } });
  }

  updateOrderStatus(order: Order) {
    // Thực hiện cập nhật trạng thái đơn hàng (thay bằng logic của bạn)
    console.log('Cập nhật trạng thái đơn hàng:', order);
  }
}
