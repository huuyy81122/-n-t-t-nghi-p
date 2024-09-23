import { filter } from 'rxjs/operators';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MonXetTuyenApiService } from 'src/app/services/api/mon-xet-tuyen.service';
import { TuyenSinhThiSinhDangKyXetTuyenApiService } from 'src/app/services/api/tuyen-sinh-thi-sinh-dang-ky.service';
import { TokenService } from 'src/app/utils/jwt';
interface IDiemHocBa {
  IdMonXetTuyen: any,
  TenMonXetTuyen: any,
  Diem1: any,
  Diem2: any,
  Diem3: any,
  Diem4: any,
  Diem5: any,
  Diem6: any
}
@Component({
  selector: 'alert-custom',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() isSuccess: boolean;

  ngOnInit(): void {
    
  }
  
}
