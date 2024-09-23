import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { QueryFilerModel } from 'src/app/models';
import { dotTuyenSinhRouter, giayToRouter } from 'src/app/utils/api-router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiayToApiService {
  constructor(private http: _HttpClient) {}

  getGiayToYeuCau(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + giayToRouter.getGiayToYeuCau, model);
  }
}
