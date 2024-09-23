import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { DonHangApiService  } from 'src/app/demo/service/tao-don-hang.service';
import { UserApiService } from '../../service/user.service';
// geocoding.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeocodingService {
    private apiKey = 'oez7ESV06v0Veo4RLW4PKHkSPrWrTPk8jA4VUyP5';
    private apiUrl = `https://rsapi.goong.io/geocode?api_key=${this.apiKey}`;
  
    constructor(private http: HttpClient) {}
  
    getCoordinates(address: string) {
      return this.http.get(`${this.apiUrl}&address=${encodeURIComponent(address)}`);
    }
  }

@Component({
    templateUrl: './quan-ly-nguoi-dung.component.html',
    styleUrls: ['./quan-ly-nguoi-dung.component.scss']
})

export class QuanLyNguoiDungComponent implements OnInit {
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
    khuVucGiaoHang: any;
    latitude: number;
    longitude: number;
    constructor(
        private donHangApiService: DonHangApiService,
        private cdf: ChangeDetectorRef, 
        private fb: FormBuilder,
        private messageService: MessageService, 
        private confirmationService: ConfirmationService,
        private datePipe: DatePipe,
        private userApiService: UserApiService,
        private geocodingService: GeocodingService, private http: HttpClient
    ) {
        this.formBuilder = this.fb.group({
            ho: [null, Validators.required],
            ten: [null, Validators.required],
            email: [null],
            sdt: [null, Validators.required],
            idRole: [null, Validators.required],
            password: [null]
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
        this.userApiService.getAll().subscribe({
                next: (res: any) => {
                    console.log(res)
                    this.data = res.listData;
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
            id: this.idNguoiDung,
            firstName: this.formBuilder.get('ho')?.value,
            lastName: this.formBuilder.get('ten')?.value,
            email: this.formBuilder.get('email')?.value,
            sdt: this.formBuilder.get('sdt')?.value,
            idRole: this.formBuilder.get('idRole')?.value,
            password: this.formBuilder.get('password')?.value
        }
    }
    setDataDetail(data: any): void {
        this.submitted = false;
        this.formBuilder.get('ho')?.setValue(data?.firstName);
        this.formBuilder.get('ten')?.setValue(data?.lastName);
        this.formBuilder.get('email')?.setValue(data?.email);
        this.formBuilder.get('sdt')?.setValue(data?.sdt);
        this.formBuilder.get('idRole')?.setValue(data?.idRole);
        this.formBuilder.get('password')?.setValue(data?.password);
    }
    clearData(): void{
        this.submitted = false;
        this.formBuilder.reset("", { emitEvent: false });
        this.formBuilder.get('ho')?.enable();
        this.formBuilder.get('ten')?.enable();
        this.formBuilder.get('email')?.enable();
        this.formBuilder.get('sdt')?.enable();
        this.formBuilder.get('idRole')?.enable();
        this.formBuilder.get('password')?.enable();
    }
    showDialog(status: any, idNguoiDung: any) {
        this.clearData();
        this.visible = true;
        this.status = status;
        this.idNguoiDung = idNguoiDung;
        if(status > 0 && idNguoiDung > 0)
        {
            this.userApiService.getById(idNguoiDung).subscribe({
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
        this.confirmationService.confirm({
            // target: event.target as EventTarget,
            message: 'Bạn có chắc muốn xóa người dùng ?',
            header: 'Xóa phương thức',
            icon: 'pi pi-info-circle',
            acceptButtonStyleClass:"p-button-danger p-button-text",
            rejectButtonStyleClass:"p-button-text p-button-text",
            acceptIcon:"none",
            rejectIcon:"none",
            acceptLabel: "Có",
            rejectLabel:"Không",

            accept: () => {
                this.userApiService.delete(idDotTuyenSinh).subscribe({
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
    onChangeKhuVuc(event: any){
        this.geocodingService.getCoordinates(this.khuVucGiaoHang).subscribe((data: any) => {
            if (data.results && data.results.length > 0) {
              this.latitude = data.results[0].geometry.location.lat;
              this.longitude = data.results[0].geometry.location.lng;
            }
          });
    }
    handleCreateUser(){
        this.submitted = true;
        if(this.formBuilder.valid)
        {
            if(this.status == 0)
            {
                var model = this.getDataDetail();
                this.userApiService.create({...model, latitude: this.latitude, longitude: this.longitude}).subscribe({
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
                    model = {...model, latitude: this.latitude, longitude: this.longitude,updatePassword: true}
                }
                else{
                    model = {...model, latitude: this.latitude, longitude: this.longitude,updatePassword: false}
                }
                console.log(model);
                this.userApiService.update(model).subscribe({
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
