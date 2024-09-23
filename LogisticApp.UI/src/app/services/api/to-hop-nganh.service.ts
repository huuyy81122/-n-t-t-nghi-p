import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { toHopNganhRoutes } from 'src/app/utils/api-router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToHopNganhApiService {
  constructor(private http: _HttpClient) {}

  getFilter(): Observable<any> {
    return this.http.post(environment.api.baseUrl + toHopNganhRoutes.getFilter);
  }
  create(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + toHopNganhRoutes.create, model)
  }
  update(model: any): Observable<any> {
    return this.http.put(environment.api.baseUrl + toHopNganhRoutes.update, model)
  }
  delete(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + toHopNganhRoutes.delete, model)
  }
  getById(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + toHopNganhRoutes.getbyid, model)
  }
  getDetail(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + toHopNganhRoutes.getdetail, model)
  }
  // getUrl(idPhuongThucXetTuyen: any, idHe: any):  Observable<any> {
  //   return this.http.post(environment.api.baseUrl + TuyenSinhThiSinhDangKyXetTuyenRouter.getUrl, {idHe, idPhuongThucXetTuyen});
  // }
}
