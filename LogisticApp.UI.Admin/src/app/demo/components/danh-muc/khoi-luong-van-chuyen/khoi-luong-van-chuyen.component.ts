import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DonHangApiService  } from 'src/app/demo/service/tao-don-hang.service';
import { UserApiService } from 'src/app/demo/service/user.service';
import { KhoiLuongVanChuyenApiService } from 'src/app/demo/service/khoi-luong-van-chuyen.service';

@Component({
    templateUrl: './khoi-luong-van-chuyen.component.html',
    styleUrls: ['./khoi-luong-van-chuyen.component.scss']
})
export class KhoiLuongVanChuyenComponent implements OnInit {
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
    idNguoiDung: any;
    id : any;
    constructor(
        private donHangApiService: DonHangApiService,
        private cdf: ChangeDetectorRef, 
        private fb: FormBuilder,
        private messageService: MessageService, 
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe,
        private userApiService: UserApiService,
        private khoiluongVanChuyenApiService : KhoiLuongVanChuyenApiService

    ) {
        this.formBuilder = this.fb.group({
            // ho: [null, Validators.required],
            // ten: [null, Validators.required],
            // email: [null],
            // sdt: [null, Validators.required],
            // idRole: [null, Validators.required],
            // password: [null],
            weightTypeId : [null],
            weightName : [null, Validators.required]
        })
        }

    ngOnInit() {
        this.initData();
        this.listRole = [
            {idRole: 1, roleName: 'Quản trị hệ thống'},
            {idRole: 2, roleName: 'Khách hàng'},
            {idRole: 3, roleName: 'Quản lý'},
            {idRole: 4, roleName: 'Nhân viên giao hàng'}
        ]
    }
    initData(): void {
        this.khoiluongVanChuyenApiService.getAll().subscribe({
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
            // id: this.idNguoiDung,
            // firstName: this.formBuilder.get('ho')?.value,
            // lastName: this.formBuilder.get('ten')?.value,
            // email: this.formBuilder.get('email')?.value,
            // sdt: this.formBuilder.get('sdt')?.value,
            // idRole: this.formBuilder.get('idRole')?.value,
            // password: this.formBuilder.get('password')?.value,
            weightTypeId : this.id ,
            weightName : this.formBuilder.get('weightName')?.value
        }
    }
    setDataDetail(data: any): void {
        // this.submitted = false;
        // this.formBuilder.get('ho')?.setValue(data?.firstName);
        // this.formBuilder.get('ten')?.setValue(data?.lastName);
        // this.formBuilder.get('email')?.setValue(data?.email);
        // this.formBuilder.get('sdt')?.setValue(data?.sdt);
        // this.formBuilder.get('idRole')?.setValue(data?.idRole);
        // this.formBuilder.get('password')?.setValue(data?.password);
        this.formBuilder.get('weightTypeId')?.setValue(data?.weightTypeId);
        this.formBuilder.get('weightName')?.setValue(data?.weightName)
    }
    clearData(): void{
        this.submitted = false;
        this.formBuilder.reset("", { emitEvent: false });
        // this.formBuilder.get('ho')?.enable();
        // this.formBuilder.get('ten')?.enable();
        // this.formBuilder.get('email')?.enable();
        // this.formBuilder.get('sdt')?.enable();
        // this.formBuilder.get('idRole')?.enable();
        // this.formBuilder.get('password')?.enable();
        this.formBuilder.get('weightTypeId')?.enable();
        this.formBuilder.get('weightName')?.enable();

    }
    showDialog(status: any, weightTypeId: any) {
        this.clearData();
        this.visible = true;
        this.status = status;
        this.id = weightTypeId;
        if(status > 0 && weightTypeId > 0)
        {
            this.khoiluongVanChuyenApiService.getById(weightTypeId).subscribe({
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
            message: 'Bạn có chắc muốn xóa khối lượng vận chuyển ?',
            header: 'Xóa khối lượng',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            acceptIcon:"none",
            rejectIcon:"none",
            acceptLabel: "Có",
            rejectLabel:"Không",

            accept: () => {
                this.khoiluongVanChuyenApiService.delete(idDotTuyenSinh).subscribe({
                    next: (res: any) => {
                        this.initData();
                        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Xóa thành công' });
                    },
                    error: (err: any) => {
                        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: err.error});
                    }
                })
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
                this.khoiluongVanChuyenApiService.create(this.getDataDetail()).subscribe({
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
                this.khoiluongVanChuyenApiService.update(model).subscribe({
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
}
