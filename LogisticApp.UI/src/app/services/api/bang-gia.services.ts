import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { QueryFilerModel } from 'src/app/models';
import { dotTuyenSinhRouter, giayToRouter, bangGiaRoutes } from 'src/app/utils/api-router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BangGiaApiService {
  constructor(private http: _HttpClient) {}

  getbangGia(): Observable<any> {
    return this.http.get(environment.api.baseUrl + bangGiaRoutes.getAll);
  }
}
