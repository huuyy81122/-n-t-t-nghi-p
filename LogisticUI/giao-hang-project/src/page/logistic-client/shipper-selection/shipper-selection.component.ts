import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Shipper {
  id: number;
  name: string;
  phone: string;
  avatar: string;
}

@Component({
  selector: 'app-shipper-selection',
  templateUrl: './shipper-selection.component.html',
  styleUrls: ['./shipper-selection.component.scss']
})
export class ShipperSelectionComponent implements OnInit {
  shippers: Shipper[] = [];
  selectedOrderId: number | null = null;

  constructor(private router: Router) {
    // Khởi tạo dữ liệu shipper (thay bằng dữ liệu thực tế của bạn)
    this.shippers = [
      { id: 1, name: 'Shipper A', phone: '0123456789', avatar: 'shipper-a-avatar.jpg' },
      { id: 2, name: 'Shipper B', phone: '0987654321', avatar: 'shipper-b-avatar.jpg' },
      // Thêm các dữ liệu shipper khác ở đây
    ];
  }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.selectedOrderId = navigation.extras.state['orderId'];
    }
  }

  selectShipper(shipper: Shipper) {
    if (this.selectedOrderId !== null) {
      // Logic cập nhật shipper cho đơn hàng tương ứng
      console.log(`Chọn shipper ${shipper.name} cho đơn hàng ${this.selectedOrderId}`);
      this.router.navigate(['/manager-order']);
    }
  }
}
