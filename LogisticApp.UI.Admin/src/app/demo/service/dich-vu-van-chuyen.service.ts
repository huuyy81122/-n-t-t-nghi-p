import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { dichVuRoutes, donHangRoutes } from '../api/api-router';

@Injectable({
  providedIn: 'root'
})
export class DichVuVanChuyenApiService {
  constructor(private http: _HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(environment.api.baseUrl + dichVuRoutes.getAll);
  }
  getById(id: any): Observable<any> {
    return this.http.get(environment.api.baseUrl + dichVuRoutes.getById+ '/' + id);
  }
  create(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + dichVuRoutes.create, model);
  }
  update(model: any): Observable<any> {
    return this.http.put(environment.api.baseUrl + dichVuRoutes.update, model);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(environment.api.baseUrl + dichVuRoutes.delete+ '/' + id);
  }
}
