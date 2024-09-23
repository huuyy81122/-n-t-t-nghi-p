import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { donHangRoutes, giaVanChuyenRoutes } from '../api/api-router';

@Injectable({
  providedIn: 'root'
})
export class GiaVanChuyenApiService {
  constructor(private http: _HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(environment.api.baseUrl + giaVanChuyenRoutes.getAll);
  }
  getById(id: any): Observable<any> {
    return this.http.get(environment.api.baseUrl + giaVanChuyenRoutes.getById+ '/' + id);
  }
  create(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + giaVanChuyenRoutes.create, model);
  }
  update(model: any): Observable<any> {
    return this.http.put(environment.api.baseUrl + giaVanChuyenRoutes.update, model);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(environment.api.baseUrl + giaVanChuyenRoutes.delete+ '/' + id);
  }
}
