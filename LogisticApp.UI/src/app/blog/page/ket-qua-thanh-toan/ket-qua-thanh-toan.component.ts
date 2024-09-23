import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { DotTuyenSinhApiService } from "src/app/services/api/dot-dang-ky.service";
import { TuyenSinhThiSinhDangKyXetTuyenApiService } from "src/app/services/api/tuyen-sinh-thi-sinh-dang-ky.service";
import { VnPayApiService } from "src/app/services/api/vnpay.service";
import { BlockService } from "src/app/shared/block-spinner/block-service.service";
import { TokenService } from "src/app/utils/jwt";
import { Location } from '@angular/common'; 
import { DonHangApiService } from "src/app/services/api/tao-don-hang.service";
@Component({
  selector: "ket-qua-thanh-toan",
  templateUrl: "./ket-qua-thanh-toan.component.html",
  styleUrls: ["./ket-qua-thanh-toan.component.scss"]
})
export class KetQuaThanhToanComponent implements OnInit {
  user: any;
  currentDate: Date = new Date();
  payInfo: any;
  vnp_BankTranNo: any;
  vnp_ResponseCode: any;
  vnp_OrderInfo: any;
  vnp_Amount: any;
  vnp_TxnRef: any;
  constructor(
    private tokenServices: TokenService,
    private vnPayApiService : VnPayApiService,
    private route: ActivatedRoute,
    private donHangApiService: DonHangApiService,
    private location: Location
  ) {
    
  }
   
  ngOnInit(): void {
    var user = this.tokenServices.decodeToken();
    this.user = user;
    this.route.queryParams.subscribe(params => {
      this.vnp_BankTranNo = params['vnp_BankTranNo'];
      this.vnp_ResponseCode = params['vnp_ResponseCode'];
      this.vnp_OrderInfo = params['vnp_OrderInfo'];
      this.vnp_Amount = params['vnp_Amount'];
      this.vnp_TxnRef = params['vnp_TxnRef'];
    });
    if(this.vnp_ResponseCode === "00")
    {
      this.donHangApiService.capNhatTrangThai({orderId: parseInt(this.vnp_OrderInfo.split("_")[1], 10), statusCode: 2}).subscribe({
        next: (res: any) => {
          console.log(res);
        }, 
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }

}
