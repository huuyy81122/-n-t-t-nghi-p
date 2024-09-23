import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../app/_core/base/base.component';
import { AppInjector } from '../../../module/app.module';
import { Validators } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.scss']
})
export class PricesComponent extends BaseComponent implements OnInit {
  breadCrumbs = [
    {
      name: 'Trang chủ',
      routerLink: '/admin/',
      active: true,
      icon: 'fas fa-home',
    },
    {
      name: 'Đơn giá',
      routerLink: '/admin/price',
      active: false,
      icon: '',
    },
  ];

  Transport_type_id_ft: any = 0;
  Service_type_id_ft: any = 0;

  listTransport: any;
  listService: any;

  constructor() {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.addForm = this.fb.group({
      Price_id: [],
      Transport_type_id: [null, [Validators.required]],
      Service_type_id: [null, [Validators.required]],
      Minimun_km: [null, [Validators.required]],
      Price: [null, [Validators.required]],
      Service_type_name: [],
      Transport_type_name: [],
    });
    await this.getList();
    await this.getListTransport();
    await this.getListService();
  }

  async getList() {
    this.priceServices
      .getList(await this.getToken(), this.Service_type_id_ft, this.Transport_type_id_ft)
      .subscribe((res: any) => {
        console.log(res);
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
    this.ID = data.Price_id ?? 0;
    this.addForm.patchValue({
      Price_id: data.Price_id ?? null,
      Transport_type_id: data.Transport_type_id ?? null,
      Service_type_id: data.Service_type_id ?? null,
      Minimun_km: data.Minimun_km ?? null,
      Price: data.Price ?? null
    });
  }

  async save() {
    var req = this.addForm.value;
    if (this.addForm.valid) {
      this.priceServices
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
    this.priceServices
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
