import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../app/_core/base/base.component';
import { AppInjector } from '../../../module/app.module';
import { Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent extends BaseComponent implements OnInit {
  breadCrumbs = [
    {
      name: 'Trang chủ',
      routerLink: '/admin/',
      active: true,
      icon: 'fas fa-home',
    },
    {
      name: 'Khách hàng',
      routerLink: '/admin/customer',
      active: false,
      icon: '',
    },
  ];



  constructor() {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.addForm = this.fb.group({
      Customer_id: [],
      Full_name: [null, [Validators.required]],
      Address: [null, [Validators.required]],
      Birth_date: [null, [Validators.required]],
      Email: [null, [Validators.required]],
      Password: []
    });
    await this.getList();
  }

  async getList() {
    this.customersServices
      .getList(await this.getToken())
      .subscribe((res: any) => {
        this.dataTable = res.ListData;
      });
  }
  openAddModal(data: any) {
    this.titleModal = data ? 'Cập nhật' : 'Thêm mới';
    this.isDisplayAddModal = true;
    this.ID = data.Customer_id ?? 0;
    this.addForm.patchValue({
      Customer_id: data.Customer_id ?? null,
      Full_name: data.Full_name ?? null,
      Address: data.Address ?? null,
      Birth_date: data.Birth_date ?? null,
      Email: data.Email ?? null
    });
  }

  async save() {
    var req = this.addForm.value;
    this.spinner.show();
    if (this.addForm.valid) {
      this.customersServices
        .save(await this.getToken(), req)
        .subscribe((res: any) => {
          this.spinner.hide();
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

  async delete() {
    this.customersServices
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
  async resend(ID: any) {
    var r = confirm("Bạn có muốn cấp lại mật khẩu mới cho khách hàng này không?")
    if(!r)
    {
      return;
    }
    this.spinner.show();
    this.customersServices
      .resend(await this.getToken(), ID)
      .subscribe((res: any) => {
        this.spinner.hide();
        if (res.Status == 1) {
          this.getList();
          this.handleCancel();
          this.toastr.success(res.Message);
        } else {
          this.toastr.warning(res.Message);
        }
      });
  }

  searchValue: any= "";
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  visible : boolean=false;
  listOfDisplayData: any=[];
  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.dataTable.filter((item: any) => item.Ho_ten.toLowerCase().includes(this.searchValue));
  }
}
