import { Component, OnInit } from '@angular/core';
// import Chart from 'chart.js/auto'
import { BaseComponent } from '../../../app/_core/base/base.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit {
  async ngOnInit(): Promise<void> {
    await this.createChart();
  }
  chartData: any;
  KhachHang: any = 0;
  DonHang: any = 0;
  LoaiHinh: any = 0;
  DichVu: any = 0;
  async createChart() {
    await this.customersServices.TongSo(await this.getToken()).subscribe((res: any) => {
      this.KhachHang = res.KhachHang;
      this.DonHang = res.DonHang;
      this.LoaiHinh = res.LoaiHinh;
      this.DichVu = res.DichVu;
    });
  }
}
