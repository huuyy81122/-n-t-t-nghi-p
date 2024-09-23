import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../app/_core/base/base.component';
import { AppInjector } from '../../../module/app.module';
import { Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent extends BaseComponent implements OnInit {
  breadCrumbs = [
    {
      name: 'Trang chủ',
      routerLink: '/admin/',
      active: true,
      icon: 'fas fa-home',
    },
    {
      name: 'Thống kê',
      routerLink: '/admin/report',
      active: false,
      icon: '',
    },
  ];

  Transport_type_id_ft: any = 0;
  Thang_ft: any = 0;
  Nam_ft: any = 0;
  Service_type_id_ft: any = 0;
  Status_ft: any = 0;

  listTransport: any;
  listService: any;

  constructor() {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.addForm = this.fb.group({
      Address: [],
      Admin_description: [],
      Customer_description: [],
      Customer_id: [],
      Email: [{ value: '', disabled: true }],
      Full_name: [{ value: '', disabled: true }],
      Order_content: [],
      Order_from: [],
      Order_id: [],
      Order_km: [],
      Order_to: [],
      Price: [],
      Status: [],
      Total: [],
      Transport_type_id: [null, [Validators.required]],
      Service_type_id: [null, [Validators.required]],
      Service_type_name: [],
      Transport_type_name: [],
    });
    await this.getList();
    await this.getListTransport();
    await this.getListService();
  }

  async getList() {
    var req = {
      Nam: this.Nam_ft,
      Thang: this.Thang_ft,
      Service_type_id: this.Service_type_id_ft,
      Transport_type_id: this.Transport_type_id_ft,
      Status: this.Status_ft,
    }
    this.reportServices
      .getList(req, await this.getToken())
      .subscribe((res: any) => {
        this.dataTable = res.ListData;
        this.listOfDisplayData = res.ListData;
      });
  }
  async getListTransport() {
    this.transportTypeServices.getList(await this.getToken()).subscribe((res: any) => {
      this.listTransport = res.ListData;
    });
  }
  async getListService() {
    this.serviceTypeServices.getList(await this.getToken()).subscribe((res: any) => {
      this.listService = res.ListData;
    });
  }
  openAddModal(data: any) {
    this.titleModal = data ? 'Cập nhật' : 'Thêm mới';
    this.isDisplayAddModal = true;
    this.ID = data.Order_id ?? 0;
    this.addForm.patchValue({
      Address: data.Address ?? null,
      Order_id: data.Order_id ?? null,
      Admin_description: data.Admin_description ?? null,
      Customer_description: data.Customer_description ?? null,
      Customer_id: data.Customer_id ?? null,
      Email: data.Email ?? null,
      Full_name: data.Full_name ?? null,
      Order_content: data.Order_content ?? null,
      Order_from: data.Order_from ?? null,
      Order_km: data.Order_km ?? null,
      Order_to: data.Order_to ?? null,
      Price: data.Price ?? null,
      Transport_type_id: data.Transport_type_id ?? null,
      Service_type_id: data.Service_type_id ?? null,
      Status: data.Status ?? null,
      Total: data.Total ?? null
    });
  }

  async save() {
    var req = this.addForm.value;
    if (this.addForm.valid) {
      this.orderServices
        .save(await this.getToken(), req)
        .subscribe((res: any) => {
          if (res.Status == 1) {
            this.getList();
            this.handleCancel();
            this.toastr.success(res.Message);
          } else {
            this.toastr.warning(res.Message);
          }
        });
    } else {
      Object.values(this.addForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  async getPrice() {
    var req = {
      Service_type_id: this.addForm.value.Service_type_id,
      Transport_type_id: this.addForm.value.Transport_type_id,
      Order_km: this.addForm.value.Order_km
    }
    this.priceServices
      .getPrice(await this.getToken(), req)
      .subscribe((res: any) => {
        if (res.Status == 1) {
          this.addForm.patchValue({
            Price: res.Data.Price ?? 0,
            Total: this.addForm.value.Order_km * res.Data.Price
          });
          this.toastr.success(res.Message);
        } else {
          this.toastr.warning(res.Message);
        }
      });
  }

  async delete() {
    this.orderServices
      .delete(await this.getToken(), this.ID)
      .subscribe((res: any) => {
        if (res.Status == 1) {
          this.getList();
          this.handleCancel();
          this.toastr.success(res.Message);
        } else {
          this.toastr.warning(res.Message);
        }
      });
  }
  searchValue: any = "";
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  visible: boolean = false;
  listOfDisplayData: any = [];
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.dataTable.filter((item: any) => item.Ho_ten.toLowerCase().includes(this.searchValue));
  }
}
