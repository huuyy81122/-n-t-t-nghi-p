import { VnPayApiService } from './../../services/api/vnpay.service';
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DotTuyenSinhApiService } from "src/app/services/api/dot-dang-ky.service";
import { TuyenSinhThiSinhDangKyXetTuyenApiService } from "src/app/services/api/tuyen-sinh-thi-sinh-dang-ky.service";
import { BlockService } from "src/app/shared/block-spinner/block-service.service";
import { TokenService } from "src/app/utils/jwt";

@Component({
  selector: "thanh-toan",
  templateUrl: "./thanh-toan.component.html",
  styleUrls: ["./thanh-toan.component.scss"]
})
export class ThanhToanComponent implements OnInit {
  events: any[];
  danhSachs: any;
  dieuChinh: any;
  user: any;
  payInfo: any;
  constructor(
    private tuyenSinhThiSinhDangKyXetTuyenApiService: TuyenSinhThiSinhDangKyXetTuyenApiService,
    private blockService: BlockService,
    private tokenServices: TokenService,
    private cdf: ChangeDetectorRef,
    private router: Router,
    private dotTuyenSinhServices: DotTuyenSinhApiService,
    private vnPayApiService : VnPayApiService
    ) {
    this.events = [
      { status: 'Đăng ký xét tuyển', date: '15/10/2020 10:30', icon: 'pi pi-cog', bgColor: '#fff', color: '#1f3080', image: 'game-controller.jpg', content: 'Trong khoảng thời gian đăng ký xét tuyển thí sinh đăng nhập vào hệ thống và lựa chọn đợt xét tuyển mong muốn.' },
      { status: 'Chờ kết quả xét duyệt', date: '15/10/2020 14:00', icon: 'pi pi-cog', bgColor: '#fff', color: '#1f3080', content: 'Quá trình xét duyệt hồ sơ của bạn sẽ diễn ra trong 20 ngày làm việc vui lòng chú ý điện thoại, email để nhận được thông báo. Nếu không thấy phản hồi sau 20 ngày hãy liên hệ với chúng tôi để được giải quyết.' },
      { status: 'Điều chỉnh nguyện vọng', date: '15/10/2020 16:15', icon: 'pi pi-cog', bgColor: '#fff', color: '#1f3080', content: 'Sau khi có kết quả, thí sinh có thể thực hiện điều chỉnh nguyện vọng. Nếu bạn không thực hiện được điều chỉnh nguyện vọng hãy liên hệ với chúng tôi,' },
      { status: 'Nhập học', date: '16/10/2020 10:00', icon: 'pi pi-check', bgColor: '#fff', color: '#1f3080', content: 'Dành cho thí sinh trúng tuyển. Thực hiện nhập học theo quy định của Bộ Giáo dục và Đào tạo' }
    ];
   }
   
  ngOnInit() {
    this.initData();
    this.dieuChinh = 1;
  }
  initData(): void {
    var user = this.tokenServices.decodeToken();
    this.user = user;
    this.vnPayApiService.payInfo(user?.user_id[0]).subscribe({
      next: (res: any) => {
        console.log(res)
        this.payInfo = res
      },
      error: (err: any) => {
        console.log(err)
      }
    })
    console.log(this.user)
  }
  handlePay(amount: any, orderDesc: any): void {
    this.vnPayApiService.pay({amount, orderDesc}).subscribe({
      next: (res: any) => {
        console.log(res);
        window.open(res.data, '_blank')
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

}
