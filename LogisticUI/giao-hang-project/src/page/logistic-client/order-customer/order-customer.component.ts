import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { common } from '../../../app/_core/app.common';
import { AppInjector } from '../../../module/app.module';
import { BaseComponent } from '../../../app/_core/base/base.component';

@Component({
  selector: 'app-order-customer',
  templateUrl: './order-customer.component.html',
  styleUrls: ['./order-customer.component.scss']
})
export class OrderCustomerComponent extends BaseComponent implements OnInit {
  Transport_type_id_ft: any = 0;
  Service_type_id_ft: any = 0;
  Status_ft: any = 0;

  listTransport: any;
  listService: any;

  constructor() {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.com = new common(this.router);
    this.CustomerObj = this.com.getCustomerObj();
    this.addForm = this.fb.group({
      Address: [],
      Admin_description: [{ value: '', disabled: true }],
      Customer_description: [],
      Customer_id: [],
      Email: [{ value: '', disabled: true }],
      Full_name: [{ value: '', disabled: true }],
      Order_content: [],
      Order_from: [],
      Order_id: [],
      Order_km: [],
      Order_to: [],
      Price: [{ value: '', disabled: true }],
      Status: [{ value: '', disabled: true }],
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
    this.orderServices
      .getList(await this.getToken(), this.Service_type_id_ft, this.Transport_type_id_ft, this.Status_ft, this.CustomerObj.Customer_id)
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
  orderData:any;
  openAddModal(data: any) {
    this.orderData=data;
    this.titleModal = data ? 'Cập nhật' : 'Thêm mới';
    this.isDisplayAddModal = true;
    this.ID = data.Order_id ?? 0;
    this.addForm.patchValue({
      Address: data.Address ?? null,
      Order_id: data.Order_id ?? 0,
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
    console.log(this.addForm.value)
    var req = this.addForm.value;
    if (req.Order_id == 0) {
      req.Status = 1;
    }
    else {
      req.Status=this.orderData.Status;
      if (req.Status > 1) {
        this.toastr.warning("Bạn chỉ có thể cập nhật đơn hàng khi chưa được duyệt!")
        return;
      }
    }
    req.Customer_id = this.CustomerObj.Customer_id;
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
