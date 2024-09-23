import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { QueryFilerModel } from 'src/app/models';
import { dotTuyenSinhRouter, monXetTuyenRoutes } from 'src/app/utils/api-router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonXetTuyenApiService {
  constructor(private http: _HttpClient) {}

  getFilter(model: QueryFilerModel): Observable<any> {
    return this.http.post(environment.api.baseUrl + monXetTuyenRoutes.getFilter, model);
  }
}
