import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmPopup } from "primeng/confirmpopup";
import { DotTuyenSinhApiService } from "src/app/services/api/dot-dang-ky.service";
import { LichSuDonHangApiService } from "src/app/services/api/lich-su-don-hang.service";
import { DonHangApiService } from "src/app/services/api/tao-don-hang.service";
import { TuyenSinhThiSinhDangKyXetTuyenApiService } from "src/app/services/api/tuyen-sinh-thi-sinh-dang-ky.service";
import { UserApiService } from "src/app/services/api/users.service";
import { VnPayApiService } from "src/app/services/api/vnpay.service";
import { BlockService } from "src/app/shared/block-spinner/block-service.service";
import { TokenService } from "src/app/utils/jwt";

@Component({
  selector: "don-hang-shipper",
  templateUrl: "./don-hang-shipper.component.html",
  styleUrls: ["./don-hang-shipper.component.scss"]
})
export class DonHangShipperComponent implements OnInit {
  events: any[];
  danhSachs: any;
  dieuChinh: any;
  checked: any;
  constructor(
    private tokenServices: TokenService,
    private cdf: ChangeDetectorRef,
    private lichSuDonHangApiService: LichSuDonHangApiService,
    private messageService: MessageService,
    private vnPayApiService: VnPayApiService,
    private confirmationService: ConfirmationService,
    private donHangApiServices: DonHangApiService,
    private userServices: UserApiService
    ) {
    this.events = [
      { status: 'Chờ xác nhận', date: '', icon: 'pi pi-cog', bgColor: '#fff', color: '#1f3080', image: 'game-controller.jpg', content: '' },
      { status: 'Giao đơn vị giao hàng', date: '', icon: 'pi pi-cog', bgColor: '#fff', color: '#1f3080', content: '' },
      { status: 'Đang vận chuyện', date: '', icon: 'pi pi-cog', bgColor: '#fff', color: '#1f3080', content: '' },
      { status: 'Đã giao thành công', date: '', icon: 'pi pi-check', bgColor: '#fff', color: '#1f3080', content: '' }
    ];
   }
   @ViewChild(ConfirmPopup) confirmPopup!: ConfirmPopup;

  ngOnInit() {
    this.initData();
    this.dieuChinh = 1;
  }
  initData(): void {
    var user = this.tokenServices.decodeToken();
    this.userServices.getUserById(user?.user_id).subscribe({
      next: (res: any) => {
       this.checked = res.verify;
       this.cdf.detectChanges();
      },
      error: (err: any) => {
        console.log(err)
      }
    })
    this.lichSuDonHangApiService.getDonDangForShiper(user?.user_id, 'false').subscribe({
      next: (res: any) => {
        if(res.statusCode === 'Success'){
          this.danhSachs = res.listData;
          this.cdf.detectChanges();
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        }
      },
      error: (err: any) => {

      }
    })
  }

capNhatTrangThai(event: any, orderId: any,statusId: any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Bạn có chắc chắn muốn cập nhật trạng thái đang giao hàng?',
        accept: () => {
            this.donHangApiServices.capNhatTrangThai({orderId: orderId,statusCode: statusId}).subscribe({
              next:(res: any) => {
                if(res.statusCode === 'Success'){
                  this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công', life: 3000 });
                  this.initData();
                }
                else{
                  this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: res.message });
                }
              },
              error:(err: any) => {
                console.log(err)
              }
            })
           
        },
        reject: () => {
            //this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
  }
  changeStatus(event: any){
    var user = this.tokenServices.decodeToken();
    this.userServices.updateStatus({id: parseInt(user?.user_id, 10), trangThaiNhanHang: event}).subscribe({
      next: (res: any) => {
        if(res.statusCode === 'Success'){
          this.messageService.add({ severity: 'success', summary: 'Thành công', detail: "Cập nhật trạng thái nhận hàng thành công" });
        }
        else{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: res.message });
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  convertStringToBool(value: string): boolean {
    return value.toLowerCase() === 'true';
  }
}
