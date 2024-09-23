import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common'; 
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
  chiTietHoaDon: any;
  hoTen: any;
  cmnd: any;
  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
  ) {
    
  }
   
  ngOnInit(): void {
    this.initData();
  }
  initData():void {
    this.route.queryParams.subscribe(params => {
      this.vnp_BankTranNo = params['vnp_BankTranNo'];
      this.vnp_ResponseCode = params['vnp_ResponseCode'];
      this.vnp_OrderInfo = params['vnp_OrderInfo'];
      this.vnp_Amount = params['vnp_Amount'];
      this.vnp_TxnRef = params['vnp_TxnRef'];
      this.hoTen = params['name'];
      this.cmnd = params['cmnd'];
    });
    this.chiTietHoaDon = [{
      khoanThu: "Thanh toán học phí, lệ phí xét tuyển năm học 2024",
      soTien: this.vnp_Amount/100,
      noiDungThanhToan: this.vnp_OrderInfo
    }]
  }
}
