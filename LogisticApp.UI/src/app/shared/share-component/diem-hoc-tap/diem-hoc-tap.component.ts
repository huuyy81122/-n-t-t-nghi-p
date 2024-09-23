import { filter } from 'rxjs/operators';
import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  selector: 'diem-hoc-tap',
  templateUrl: './diem-hoc-tap.component.html',
  styleUrls: ['./diem-hoc-tap.component.scss']
})
export class DiemHocTapComponent implements OnInit, OnChanges {
  @Input() dataDiemInput: any;
  filter: any;
  dataDiem: any;
  constructor(private monXetTuyenApiService: MonXetTuyenApiService, private cdf: ChangeDetectorRef, private tuyenSinhThiSinhDangKyXetTuyenApiService: TuyenSinhThiSinhDangKyXetTuyenApiService, private tokenServices: TokenService){
    // this.dataDiem = [];
  }
  ngOnInit(): void {
    this.initData();
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    // Kiểm tra nếu input dataThongTinCaNhan đã thay đổi
    if (changes.dataDiemInput) {
      // Cập nhật dữ liệu trong component con khi dữ liệu trong component cha thay đổi
      this.dataDiem = changes.dataDiemInput.currentValue;
      this.initData();
    }
  }
  getData(): any{
    return this.dataDiem;
  }
  initData(): void{
    this.dataDiem = this.dataDiemInput?.length > 0 ? this.dataDiem : this.getDiem()
    this.cdf.detectChanges()
  }
  getDiem(): any{
    this.filter = {pageNumber: 1, pageSize: 1000}
    this.monXetTuyenApiService.getFilter(this.filter).subscribe({
      next: (res: any) => {
        this.dataDiem = res.data;
        this.cdf.detectChanges();
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }
}
