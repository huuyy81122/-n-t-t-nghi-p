import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { QueryFilerModel } from 'src/app/models';
import { thiSinhDangKyTuyenSinhRouter } from 'src/app/utils/api-router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TuyenSinhThiSinhDangKyXetTuyenApiService {
  constructor(private http: _HttpClient) {}

  createThiSinh(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + thiSinhDangKyTuyenSinhRouter.createThiSinhDangKyXetTuyen, model);
  }
  getThiSinh(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + thiSinhDangKyTuyenSinhRouter.getThiSinh, model);
  }
  getDanhSachHoSo(idHoSo: any): Observable<any> {
    return this.http.get(environment.api.baseUrl + thiSinhDangKyTuyenSinhRouter.getDanhSachHoSo + idHoSo);
  }
  updateThiSinh(model: any): Observable<any>{
    return this.http.post(environment.api.baseUrl + thiSinhDangKyTuyenSinhRouter.updateThiSinh, model);
  }
  capNhatTrangThai(model: any): Observable<any>{
    return this.http.put(environment.api.baseUrl + thiSinhDangKyTuyenSinhRouter.capNhatTrangThai, model);
  }
  capNhatHoaDon(model: any): Observable<any>{
    return this.http.put(environment.api.baseUrl + thiSinhDangKyTuyenSinhRouter.capNhatHoaDon, model);
  }
  traCuu(model: any):  Observable<any> {
    return this.http.post(environment.api.baseUrl + thiSinhDangKyTuyenSinhRouter.traCuu, model);
  }
}
