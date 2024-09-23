import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { nganhRoutes } from 'src/app/utils/api-router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NganhApiService {
  constructor(private http: _HttpClient) {}

  getDanhSachNganh(): Observable<any> {
    return this.http.post(environment.api.baseUrl + nganhRoutes.getFilter);
  }
  // getUrl(idPhuongThucXetTuyen: any, idHe: any):  Observable<any> {
  //   return this.http.post(environment.api.baseUrl + TuyenSinhThiSinhDangKyXetTuyenRouter.getUrl, {idHe, idPhuongThucXetTuyen});
  // }
}
