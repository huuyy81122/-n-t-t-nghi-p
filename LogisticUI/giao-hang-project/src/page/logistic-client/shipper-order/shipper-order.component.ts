import { Component, OnInit } from '@angular/core';

interface Order {
    id: number;
    trackingCode: string;
    deliveryDate: string;
    receiverName: string;
    receiverPhoneNumber: string;
    receiverAddress: string;
    status: string;
}

@Component({
    selector: 'app-shipper-order',
    templateUrl: './shipper-order.component.html',
    styleUrls: ['./shipper-order.component.scss']
})
export class ShipperOrderComponent implements OnInit {
    orders: Order[] = [];

    constructor() {
        // Mock data for orders (replace with your actual data)
        this.orders = [
            { id: 1, trackingCode: 'DH001', deliveryDate: '2024-07-18', receiverName: 'Nguyễn Văn A', receiverPhoneNumber: '0123456789', receiverAddress: '123 Đường ABC, Quận XYZ', status: 'received' },
            { id: 2, trackingCode: 'DH002', deliveryDate: '2024-07-19', receiverName: 'Trần Thị B', receiverPhoneNumber: '0987654321', receiverAddress: '456 Đường XYZ, Quận ABC', status: 'delivering' },
            { id: 1, trackingCode: 'DH001', deliveryDate: '2024-07-18', receiverName: 'Nguyễn Văn A', receiverPhoneNumber: '0123456789', receiverAddress: '123 Đường ABC, Quận XYZ', status: 'received' },
            { id: 2, trackingCode: 'DH002', deliveryDate: '2024-07-19', receiverName: 'Trần Thị B', receiverPhoneNumber: '0987654321', receiverAddress: '456 Đường XYZ, Quận ABC', status: 'delivering' },
            { id: 1, trackingCode: 'DH001', deliveryDate: '2024-07-18', receiverName: 'Nguyễn Văn A', receiverPhoneNumber: '0123456789', receiverAddress: '123 Đường ABC, Quận XYZ', status: 'received' },
            { id: 2, trackingCode: 'DH002', deliveryDate: '2024-07-19', receiverName: 'Trần Thị B', receiverPhoneNumber: '0987654321', receiverAddress: '456 Đường XYZ, Quận ABC', status: 'delivering' },
            { id: 1, trackingCode: 'DH001', deliveryDate: '2024-07-18', receiverName: 'Nguyễn Văn A', receiverPhoneNumber: '0123456789', receiverAddress: '123 Đường ABC, Quận XYZ', status: 'received' },
            { id: 2, trackingCode: 'DH002', deliveryDate: '2024-07-19', receiverName: 'Trần Thị B', receiverPhoneNumber: '0987654321', receiverAddress: '456 Đường XYZ, Quận ABC', status: 'delivering' },
            // Add more orders here
        ];
    }

    ngOnInit(): void {}

    updateOrderStatus(order: Order) {
        // Update order status logic (replace with your actual logic)
        console.log('Updating order status:', order);
    }
}

