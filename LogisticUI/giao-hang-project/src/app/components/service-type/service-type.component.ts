import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../app/_core/base/base.component';
import { AppInjector } from '../../../module/app.module';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.scss']
})
export class ServiceTypeComponent extends BaseComponent implements OnInit {
  breadCrumbs = [
    {
      name: 'Trang chủ',
      routerLink: '/admin/',
      active: true,
      icon: 'fas fa-home',
    },
    {
      name: 'Dịch vụ vận chuyển',
      routerLink: '/admin/service-type',
      active: false,
      icon: '',
    },
  ];

  constructor() {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.addForm = this.fb.group({
      Service_type_name: [null, [Validators.required]],
    });
    await this.getList();
  }

  async getList() {
    this.serviceTypeServices.getList(await this.getToken()).subscribe((res: any) => {
      this.dataTable = res.ListData;
    });
  }

  openAddModal(data: any) {
    this.titleModal = data ? 'Cập nhật' : 'Thêm mới';
    this.isDisplayAddModal = true;
    this.ID = data.Service_type_id ?? 0;
    this.addForm.patchValue({
      Service_type_name: data.Service_type_name ?? null,
    });
  }

  async save() {
    var req = this.addForm.value;
    req.Service_type_id = this.ID;
    if (this.addForm.valid) {
      this.serviceTypeServices
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

  async delete() {
    this.serviceTypeServices
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
}
