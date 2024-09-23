import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmPopup } from "primeng/confirmpopup";
import { DotTuyenSinhApiService } from "src/app/services/api/dot-dang-ky.service";
import { LichSuDonHangApiService } from "src/app/services/api/lich-su-don-hang.service";
import { DonHangApiService } from "src/app/services/api/tao-don-hang.service";
import { TuyenSinhThiSinhDangKyXetTuyenApiService } from "src/app/services/api/tuyen-sinh-thi-sinh-dang-ky.service";
import { VnPayApiService } from "src/app/services/api/vnpay.service";
import { VoteApiService } from "src/app/services/api/vote.service";
import { BlockService } from "src/app/shared/block-spinner/block-service.service";
import { TokenService } from "src/app/utils/jwt";

@Component({
  selector: "danh-gia-shipper",
  templateUrl: "./danh-gia-shipper.component.html",
  styleUrls: ["./danh-gia-shipper.component.scss"]
})
export class DanhGiaForShipperComponent implements OnInit {
  events: any[];
  danhSachs: any;
  dieuChinh: any;
  data: any;
  options: any;
  sum: any;
  trungBinhDiem: any;
  constructor(
    private tokenServices: TokenService,
    private cdf: ChangeDetectorRef,
    private voteApiServices: VoteApiService,
    private messageService: MessageService,
    private vnPayApiService: VnPayApiService,
    private confirmationService: ConfirmationService,
    private donHangApiServices: DonHangApiService
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
    this.voteApiServices.getVoteForShipper(user?.user_id).subscribe({
      next: (res: any) => {
        this.danhSachs = res.vote;
        this.sum = res.voteSum;
        this.trungBinhDiem = res.voteAverage;
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            }
        };
        this.data = {
          labels: ['Đánh giá tốt', 'Đánh giá trung bình', 'Đánh giá thấp'],
          datasets: [
              {
                  data: [res.voteGood, res.voteAverage, res.voteBad],
                  backgroundColor: [documentStyle.getPropertyValue('--green-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--red-500')],
                  hoverBackgroundColor: [documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--red-400')]
              }
          ]
      };
        this.cdf.detectChanges();
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
