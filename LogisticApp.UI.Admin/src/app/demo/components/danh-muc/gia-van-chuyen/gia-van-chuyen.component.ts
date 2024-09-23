import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { GiaVanChuyenApiService } from 'src/app/demo/service/gia-van-chuyen.service';
import { DonHangApiService  } from 'src/app/demo/service/tao-don-hang.service';
import { UserApiService } from 'src/app/demo/service/user.service';

@Component({
    templateUrl: './gia-van-chuyen.component.html',
    styleUrls: ['./gia-van-chuyen.component.scss']
})
export class GiaVanChuyenComponent implements OnInit {
    customers!: any[];
    formBuilder: any;
    representatives!: any[];
    submitted: any;
    statuses!: any[];
    visible: any;
    loading: boolean = true;
    status: any;
    activityValues: number[] = [0, 100];
    data: any;
    listRole : any;
    id: any;
    dichVu: any;
    weight: any;
    hinhThucVanChuyen: any;
    constructor(
        private donHangApiService: DonHangApiService,
        private cdf: ChangeDetectorRef, 
        private fb: FormBuilder,
        private messageService: MessageService, 
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe,
        private giaVanChuyenApiService: GiaVanChuyenApiService
    ) {
        this.formBuilder = this.fb.group({
            transportTypeId: [null, Validators.required],
            serviceTypeId: [null, Validators.required],
            weightTypeId: [null],
            priceValue: [null, Validators.required]
        })
    }

    ngOnInit() {
        this.initData();
        this.listRole = [
            {idRole: 1, roleName: 'Quản trị hệ thống'},
            {idRole: 2, roleName: 'Khách hàng'},
            {idRole: 3, roleName: 'Quản lý'},
            {idRole: 4, roleName: 'Nhân viên giao hàng'}
        ];
        this.getTransport();
        this.getService();
        this.getWeight();
    }
    initData(): void {
        this.giaVanChuyenApiService.getAll().subscribe({
                next: (res: any) => {
                    console.log(res)
                    this.data = res;
                    this.cdf.detectChanges();
                },
                error: (err: any) => {
                    console.log(err)
                }
        });
    }
    clear(table: Table) {
        table.clear();
    }
    getDataDetail(): any {
        this.submitted = false;
        return {
            priceId: this.id,
            transportTypeId: this.formBuilder.get('transportTypeId')?.value,
            serviceTypeId: this.formBuilder.get('serviceTypeId')?.value,
            weightTypeId: this.formBuilder.get('weightTypeId')?.value,
            priceValue: this.formBuilder.get('priceValue')?.value
        }
    }
    setDataDetail(data: any): void {
        this.submitted = false;
        this.formBuilder.get('transportTypeId')?.setValue(data?.transportTypeId);
        this.formBuilder.get('serviceTypeId')?.setValue(data?.serviceTypeId);
        this.formBuilder.get('weightTypeId')?.setValue(data?.weightTypeId);
        this.formBuilder.get('priceValue')?.setValue(data?.priceValue);
    }
    clearData(): void{
        this.submitted = false;
        this.formBuilder.reset("", { emitEvent: false });
        this.formBuilder.get('transportTypeId')?.enable();
        this.formBuilder.get('serviceTypeId')?.enable();
        this.formBuilder.get('weightTypeId')?.enable();
        this.formBuilder.get('priceValue')?.enable();
    }
    showDialog(status: any, id: any) {
        this.clearData();
        this.visible = true;
        this.status = status;
        this.id = id;
        if(status > 0 && id > 0)
        {
            this.giaVanChuyenApiService.getById(id).subscribe({
                next: (res: any) => {
                    this.setDataDetail(res);
                    this.cdf.detectChanges();
                },
                error: (err: any) => {
                    this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: err.error});
                }
            })
        }
        this.cdf.detectChanges();
    }
    deleteDotTuyenSinh(idDotTuyenSinh:any): void {
        console.log(idDotTuyenSinh);
        this.confirmationService.confirm({
            // target: event.target as EventTarget,
            message: 'Bạn có chắc muốn xóa đợt tuyển sinh ?',
            header: 'Xóa phương thức',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            acceptIcon:"none",
            rejectIcon:"none",
            acceptLabel: "Có",
            rejectLabel:"Không",

            accept: () => {
                // this.DotTuyenSinhApiService.delete(idDotTuyenSinh).subscribe({
                //     next: (res: any) => {
                //         this.initData();
                //         this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công' });
                //     },
                //     error: (err: any) => {
                //         this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: err.error});
                //     }
                // })
            },
            reject: () => {
            }
        });
    }
    handleCreateUser(){
        this.submitted = true;
        if(this.formBuilder.valid)
        {
            if(this.status == 0)
            {
                this.giaVanChuyenApiService.create(this.getDataDetail()).subscribe({
                    next: (res: any) => {
                        this.visible = false;
                        this.submitted = false;
                        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Thêm mới người dùng' });
                        this.initData();
                        this.cdf.detectChanges();
                    },
                    error: (err: any) => {
                        this.visible = false;
                        this.submitted = false;
                        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: err.error});
                    }
                })
            }
            else if(this.status == 1)
            {
                var model = this.getDataDetail();
                if(model.password !== '' && model.password !== null && model.password !== undefined ){
                    model = {...model, updatePassword: true}
                }
                else{
                    model = {...model, updatePassword: false}
                }
                console.log(model);
                this.giaVanChuyenApiService.update(model).subscribe({
                    next: (res: any) => {
                        console.log(res);
                        this.initData();
                        this.submitted = false;
                        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật người dùng' });
                        this.visible = false;
                        this.clearData();
                        this.cdf.detectChanges();
                    },
                    error: (err: any) => {
                        this.visible = false;
                        this.submitted = false;
                        this.clearData();
                        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: err.error});
                    }
                })
            }
        }
    }
    getService(){
        this.donHangApiService.getServices().subscribe({
          next: (res: any) => {
            this.dichVu = res;
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      }
      getWeight(){
        this.donHangApiService.getWeight().subscribe({
          next: (res: any) => {
            this.weight = res;
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      }
      getTransport(){
        this.donHangApiService.getTransport().subscribe({
          next: (res: any) => {
            this.hinhThucVanChuyen = res;
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      }
}
