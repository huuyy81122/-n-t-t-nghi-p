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
  templateUrl: "./quan-ly-don-hang-shipper.component.html",
  styleUrls: ["./quan-ly-don-hang-shipper.component.scss"]
})
export class QuanLyDonHangShipperComponent implements OnInit {
  events: any[];
  danhSachs: any;
  dieuChinh: any;
  listShipper: any;
  visible1: any = false;
  user: any;
  deXuatShipper: any;
  orderId: any;
  constructor(
    private tokenServices: TokenService,
    private cdf: ChangeDetectorRef,
    private lichSuDonHangApiService: LichSuDonHangApiService,
    private messageService: MessageService,
    private vnPayApiService: VnPayApiService,
    private confirmationService: ConfirmationService,
    private donHangApiServices: DonHangApiService,
    private userApiServices: UserApiService
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
    this.getAllUser();
    this.dieuChinh = 1;
  }
  initData(): void {
    this.user = this.tokenServices.decodeToken();
    this.donHangApiServices.getAll().subscribe({
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
  pay(id: any): void{
    var thongTinThanhToan = this.vnPayApiService.payInfo(id).subscribe({
      next: (res: any) => {
        this.handlePay(res.soTienThanhToan, res.noiDungThanhToan);
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Thanh toán thất bại vui lòng thử lại sau!' });
      }
    })
  }
  handlePay(amount: any, noiDung: any){
    var model = {
      orderId: 0,
      amount: amount,
      orderDesc: noiDung,
      createdDate: "2024-07-17T17:20:19.944Z",
      status: "string",
      paymentTranId: 0,
      bankCode: "string",
      payStatus: "string"
    }
    this.vnPayApiService.pay(model).subscribe({
      next: (res: any) => {
        window.open(res.data, '_blank')
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  updateStatus(){

  }
  handleGanShipper(shipperId: any){
    this.donHangApiServices.ganShipper({shipperId: shipperId, managerId:  parseInt(this.user?.user_id, 10), orderId: this.orderId}).subscribe({
      next: (res: any) => {
        this.initData();
        this.messageService.add({ severity: 'success', summary: 'Thành công', detail: 'Cập nhật thành công', life: 3000 });
        this.visible1 = false;
       
      },
      error: (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: 'Thất bại', life: 3000 });
        this.visible1 = false;
      }
    })
  }
  showModal(orderId: any){
    this.visible1 = true;
    this.orderId = orderId;
    this.donHangApiServices.deXuatShipper(orderId).subscribe({
      next: (res: any) => {
        this.deXuatShipper = res;
        this.cdf.detectChanges();
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
  getAllUser(){
    this.userApiServices.getShipperDeXuat().subscribe({
      next: (res: any) => {
        this.listShipper = res.listData;
        this.cdf.detectChanges();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
  getStars(rate: number): number[] {
    return Array(Math.floor(rate)).fill(0);
  }
  capNhatTrangThai(event: any, orderId: any,statusId: any) {
    this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: statusId === 6 ? 'Bạn có chắc muốn cập nhật giao hàng thất bại?' : 'Bạn có chắc muốn cập nhật giao hàng thành công?',
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
}
