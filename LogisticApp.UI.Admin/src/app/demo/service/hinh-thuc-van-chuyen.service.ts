import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { donHangRoutes, hinhThucRoutes } from '../api/api-router';

@Injectable({
  providedIn: 'root'
})
export class HinhThucVanChuyenApiService {
  constructor(private http: _HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(environment.api.baseUrl + hinhThucRoutes.getAll);
  }
  getById(id: any): Observable<any> {
    return this.http.get(environment.api.baseUrl + hinhThucRoutes.getById+ '/' + id);
  }
  create(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + hinhThucRoutes.create, model);
  }
  update(model: any): Observable<any> {
    return this.http.put(environment.api.baseUrl + hinhThucRoutes.update, model);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(environment.api.baseUrl + hinhThucRoutes.delete+ '/' + id);
  }
}
