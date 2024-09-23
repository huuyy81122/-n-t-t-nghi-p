import { GiayToApiService } from './../../../services/api/giay-to.service';
import { filter } from 'rxjs/operators';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MonXetTuyenApiService } from 'src/app/services/api/mon-xet-tuyen.service';
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
  selector: 'giay-to',
  templateUrl: './giay-to.component.html',
  styleUrls: ['./giay-to.component.scss']
})
export class GiayToComponent implements OnInit {
  filter: any;
  dataGiayTo: any[];
  constructor(private giayToApiService: GiayToApiService, private cdf: ChangeDetectorRef, ){
    this.dataGiayTo = [];
  }
  ngOnInit(): void {
    this.filter = {pageNumber: 1, pageSize: 1000, showAdSearch: false, textSearch: null}
    this.getGiayToYeuCau();
  }
  getGiayToYeuCau(): void {
    this.giayToApiService.getGiayToYeuCau({idHe: 1, idPhuongThucXetTuyen: 2}).subscribe({
      next: (res: any) => {
        
      },
      error: (err: any) => {

      }
    })
  }
  getData(): any {
    
  }
}
