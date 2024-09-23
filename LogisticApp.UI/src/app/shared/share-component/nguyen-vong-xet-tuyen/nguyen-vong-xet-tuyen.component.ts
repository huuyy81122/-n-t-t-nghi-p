import { filter } from 'rxjs/operators';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MonXetTuyenApiService } from 'src/app/services/api/mon-xet-tuyen.service';
import { TuyenSinhThiSinhDangKyXetTuyenApiService } from 'src/app/services/api/tuyen-sinh-thi-sinh-dang-ky.service';
import { TokenService } from 'src/app/utils/jwt';
import { NganhApiService } from 'src/app/services/api/nganh.service';
import { ToHopNganhApiService } from 'src/app/services/api/to-hop-nganh.service';
interface INguyenVong {
  thuTuXet: any,
  idNganh: any,
  idToHopXetTuyen: any
}
@Component({
  selector: 'nguyen-vong-xet-tuyen',
  templateUrl: './nguyen-vong-xet-tuyen.component.html',
  styleUrls: ['./nguyen-vong-xet-tuyen.component.scss']
})
export class NguyenVongXetTuyenComponent implements OnInit, OnChanges {
  @Input() dataNguyenVongInput: any;
  @Input() he: any;
  @Input() phuongThuc: any;
  @Output() readonly editChange = new EventEmitter<any>();
  filter: any;
  cities: any;
  soThuTus: any;
  nganhs: any;
  toHops: any;
  toHopSelectItem: any;
  dataNguyenVong: any;
  toHopFilters: any;
  constructor(private monXetTuyenApiService: MonXetTuyenApiService, private tokenServices: TokenService,private cdf: ChangeDetectorRef, private tuyenSinhThiSinhDangKyXetTuyenApiService: TuyenSinhThiSinhDangKyXetTuyenApiService, private nganhApiService: NganhApiService, private toHopNganhApiService: ToHopNganhApiService){
    // this.dataNguyenVong = [{thuTuXet:0, idNganh: 0, idToHopXetTuyen: 0}];
    this.soThuTus = [];
    this.nganhs = [];
    this.toHops = [];
    this.toHopSelectItem = [[]];
  }
  ngOnInit(): void {
    this.initData()
  }
  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
    // Kiểm tra nếu input dataThongTinCaNhan đã thay đổi
    if (changes.dataNguyenVongInput) {
      // Cập nhật dữ liệu trong component con khi dữ liệu trong component cha thay đổi
      this.dataNguyenVong = changes.dataNguyenVongInput.currentValue;
      if(this.he !== null && this.phuongThuc !== null)
        {
          this.toHopNganhApiService.getDetail({idHe: this.he, idPhuongThucXetTuyen: this.phuongThuc}).subscribe({
            next: (res: any) => {
              this.toHops = res.listData;
              for(let i = 0; i < this.dataNguyenVong?.length; i ++){
                this.changeDataToHop(this.dataNguyenVong[i].idNganh, i);
              }
            },
            error: (err: any) => {
              console.log(err);
            }
          })
        }
    }
    if(changes.he || changes.phuongThuc)
    {
      this.initData()
    }
  }
  onClick(): void {
  }
  onAddNguyenVong(): void{
    this.dataNguyenVong.push({thuTuXet:0, idNganh: 0, idToHopXetTuyen: 0})
  }
  onRemoveNguyenVong(index: any): void{
    this.dataNguyenVong.splice(index, 1)
  }
  getData(): any {
    return this.dataNguyenVong;
  }
  initData(): void {
    this.dataNguyenVong = this.dataNguyenVongInput?.length > 0 ? this.dataNguyenVong :  [{thuTuXet:0, idNganh: 0, idToHopXetTuyen: 0}];
    this.cities = [
      { name: 'New York', code: 'NY' },
      { name: 'Rome', code: 'RM' },
      { name: 'London', code: 'LDN' },
      { name: 'Istanbul', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
    for(let i = 0; i < 100; i++){
      this.soThuTus.push({index: i+1, value: i+1})
    };
    this.nganhApiService.getDanhSachNganh().subscribe({
      next: (res: any) => {
        this.nganhs = res
        this.cdf.detectChanges();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
    if(this.he !== null && this.he !== "" && this.phuongThuc !== null && this.phuongThuc !== "" )
      {
        this.toHopNganhApiService.getDetail({idHe: this.he, idPhuongThucXetTuyen: this.phuongThuc}).subscribe({
          next: (res: any) => {
            this.toHops = res.listData;
          },
          error: (err: any) => {
            console.log(err);
          }
        })
      }
  }
  checkValid(): any{
    console.log(this.dataNguyenVong)
    for(let i = 0 ; i < this.dataNguyenVong.length; i ++){
      if(this.dataNguyenVong[i].idNganh === 0 || this.dataNguyenVong[i].idToHopXetTuyen === 0 || this.dataNguyenVong[i].thuTuXet === 0)
      {
        return false;
      }
    }
    return true;
  }
  changeDataToHop(selectedItemId: any, i : any): void {
    console.log(this.toHops)
    this.toHopFilters = this.toHops.filter(item => item.listNganh.includes(selectedItemId));
    this.toHopSelectItem.splice(i, 1);
    this.toHopSelectItem.push(this.toHopFilters);
    this.cdf.detectChanges(); 
  }

}
