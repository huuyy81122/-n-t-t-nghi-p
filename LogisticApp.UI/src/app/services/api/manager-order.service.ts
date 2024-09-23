import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { QueryFilerModel } from 'src/app/models';
import { dotTuyenSinhRouter, giayToRouter, lichSuDonHangRoutes } from 'src/app/utils/api-router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerServices {
  constructor(private http: _HttpClient) {}

  getLichSuDonDang(id: any): Observable<any> {
    return this.http.get(environment.api.baseUrl + lichSuDonHangRoutes.getAll + "?id=" + id);
  }
}
