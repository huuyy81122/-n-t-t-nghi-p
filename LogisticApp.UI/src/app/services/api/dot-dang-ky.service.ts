import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { QueryFilerModel } from 'src/app/models';
import { dotTuyenSinhRouter } from 'src/app/utils/api-router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DotTuyenSinhApiService {
  constructor(private http: _HttpClient) {}

  getFilter(model: QueryFilerModel): Observable<any> {
    return this.http.post(environment.api.baseUrl + dotTuyenSinhRouter.getFilter, model);
  }

  getUrl(idPhuongThucXetTuyen: any, idHe: any):  Observable<any> {
    return this.http.post(environment.api.baseUrl + dotTuyenSinhRouter.getUrl, {idHe, idPhuongThucXetTuyen});
  }

  getDetail(maDot: any):Observable<any>{
    return this.http.get(environment.api.baseUrl + dotTuyenSinhRouter.getDetail + maDot);
  }
}
