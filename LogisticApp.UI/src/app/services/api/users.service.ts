import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { QueryFilerModel } from 'src/app/models';
import { authenticationRouter, dotTuyenSinhRouter, userRoutes } from 'src/app/utils/api-router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private http: _HttpClient) {}
  create(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + userRoutes.create, model);
  }
  getShipper(): Observable<any> {
    return this.http.get(environment.api.baseUrl + userRoutes.getShipper);
  }
  getShipperDeXuat(): Observable<any> {
    return this.http.get(environment.api.baseUrl + userRoutes.getShipper + "&deXuat=true");
  }
  updateStatus(model: any): Observable<any> {
    return this.http.put(environment.api.baseUrl + userRoutes.updateStatus, model);
  }
  getUserById(id: any): Observable<any> {
    return this.http.get(environment.api.baseUrl + userRoutes.getById + id);
  }
}
