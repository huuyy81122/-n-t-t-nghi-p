import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { payRouter } from '../api/api-router';

@Injectable({
  providedIn: 'root'
})
export class VnPayApiService {
  constructor(private http: _HttpClient) {}

  pay(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + payRouter.pay, model);
  }
  payInfo(id: any): Observable<any> {
    return this.http.get(environment.api.baseUrl + payRouter.payInfo+id);
  }
  // getUrl(idPhuongThucXetTuyen: any, idHe: any):  Observable<any> {
  //   return this.http.post(environment.api.baseUrl + TuyenSinhThiSinhDangKyXetTuyenRouter.getUrl, {idHe, idPhuongThucXetTuyen});
  // }
}
