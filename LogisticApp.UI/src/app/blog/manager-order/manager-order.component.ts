import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { DotTuyenSinhApiService } from "src/app/services/api/dot-dang-ky.service";
import { LichSuDonHangApiService } from "src/app/services/api/lich-su-don-hang.service";
import { TuyenSinhThiSinhDangKyXetTuyenApiService } from "src/app/services/api/tuyen-sinh-thi-sinh-dang-ky.service";
import { VnPayApiService } from "src/app/services/api/vnpay.service";
import { BlockService } from "src/app/shared/block-spinner/block-service.service";
import { TokenService } from "src/app/utils/jwt";

@Component({
  selector: "manager-order",
  templateUrl: "./manager-order.component.html",
  styleUrls: ["./manager-order.component.scss"]
})
export class ManagerOrderComponent implements OnInit {
  events: any[];
  danhSachs: any;
  dieuChinh: any;
  constructor(
    private tuyenSinhThiSinhDangKyXetTuyenApiService: TuyenSinhThiSinhDangKyXetTuyenApiService,
    private blockService: BlockService,
    private tokenServices: TokenService,
    private cdf: ChangeDetectorRef,
    private router: Router,
    private lichSuDonHangApiService: LichSuDonHangApiService,
    private messageService: MessageService,
    private vnPayApiService: VnPayApiService
    ) {
    this.events = [
      { status: 'Chờ xác nhận', date: '', icon: 'pi pi-cog', bgColor: '#fff', color: '#1f3080', image: 'game-controller.jpg', content: '' },
      { status: 'Giao đơn vị giao hàng', date: '', icon: 'pi pi-cog', bgColor: '#fff', color: '#1f3080', content: '' },
      { status: 'Đang vận chuyện', date: '', icon: 'pi pi-cog', bgColor: '#fff', color: '#1f3080', content: '' },
      { status: 'Đã giao thành công', date: '', icon: 'pi pi-check', bgColor: '#fff', color: '#1f3080', content: '' }
    ];
   }
   
  ngOnInit() {
    this.initData();
    this.dieuChinh = 1;
  }
  initData(): void {
    var user = this.tokenServices.decodeToken();
    this.lichSuDonHangApiService.getLichSuDonDang(user?.user_id).subscribe({
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
  // getUrl(urlMauPhieu: any, maDot: any, type: any){
  //   var url =  'dang-ky-xet-tuyen/' + urlMauPhieu + '/' + 'DOT_' + maDot + '?type=' + type
  //   this.router.navigateByUrl(url)
  // }
}
