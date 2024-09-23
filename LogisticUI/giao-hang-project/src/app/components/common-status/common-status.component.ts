import { Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../../app/_core/base/base.component';
import { AppInjector } from '../../../module/app.module';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-common-status',
  templateUrl: './common-status.component.html',
  styleUrls: ['./common-status.component.scss']
})
export class CommonStatusComponent extends BaseComponent implements OnInit {
  @Input() Order_id: any; 
  @Input() isAdmin: any; 
  constructor() {
    super();
  }
StatusDatatable: any;
  async ngOnInit(): Promise<void> {
    this.addForm = this.fb.group({
      Order_status_id: [],
      Order_id: [],
      Order_status_content: [null, [Validators.required]],
      Order_status_type: [null, [Validators.required]],
      Order_status_date: [null, [Validators.required]],
    });
    await this.getList();
  }

  async getList() {
    this.orderStatusService.getList(this.Order_id,await this.getToken()).subscribe((res: any) => {
      this.StatusDatatable = res.ListData;
    });
  }
  

  openAddModal(data: any) {
    this.titleModal = data ? 'Cập nhật' : 'Thêm mới';
    this.isDisplayAddModal = true;
    this.addForm.patchValue({
      Order_status_id: data.Order_status_id ?? 0,
      Order_id: data.Order_id ?? null,
      Order_status_content: data.Order_status_content ?? null,
      Order_status_date: data.Order_status_date ?? null,
      Order_status_type: data.Order_status_type ?? null,
    });
  }

  async save() {
    var req = this.addForm.value;
    req.Order_id = this.Order_id;
    if (this.addForm.valid) {
      this.orderStatusService
        .Save(await this.getToken(), req)
        .subscribe((res: any) => {
          if (res.Status == 1) {
            this.getList();
            this.toogleisDisplayAddModal();
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
    this.orderStatusService
      .Delete(await this.getToken(), this.Order_id)
      .subscribe((res: any) => {
        if (res.Status == 1) {
          this.getList();
          this.toggleisDisplayDelete();
          this.toastr.success(res.Message);
        } else {
          this.toastr.warning(res.Message);
        }
      });
  }
}

