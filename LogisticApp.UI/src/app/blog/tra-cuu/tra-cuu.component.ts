import { TuyenSinhThiSinhDangKyXetTuyenApiService } from 'src/app/services/api/tuyen-sinh-thi-sinh-dang-ky.service';
import { DotTuyenSinhApiService } from './../../services/api/dot-dang-ky.service';
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { MessageService } from 'primeng/api';
import { BlockService } from 'src/app/shared/block-spinner/block-service.service';
import { DonHangApiService } from 'src/app/services/api/tao-don-hang.service';

@Component({
  selector: "tra-cuu",
  templateUrl: "./tra-cuu.component.html",
  styleUrls: ["./tra-cuu.component.scss"]
})
export class TraCuuComponent implements OnInit {
  danhSachs: any[];
  dotXetTuyen: any[];
  maDonHang: any = '';
  idDotDangKy: any = 0;
  constructor(private blockService: BlockService,private messageService: MessageService,private donHangApiService: DonHangApiService, private cdf: ChangeDetectorRef) {
   }

  ngOnInit() {
  }
  
  handleTraCuu(): void {
    this.blockService.block();
    this.donHangApiService.getDonHangByMa(this.maDonHang).subscribe({
      next: (res: any) => {
        console.log(res);
        this.blockService.unblock();
        if(res.statusCode !== 'Success')
        {
          this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: res.message });
        }
        else{
          this.danhSachs = [res.data];
        }
      },
      error: (err: any) => {
        this.blockService.unblock();
        this.messageService.add({ severity: 'error', summary: 'Thất bại', detail: "Đã có lỗi khi thực hiện. Vui lòng thử lại sau" });
        console.log(err);
      }
    })
  }
}
