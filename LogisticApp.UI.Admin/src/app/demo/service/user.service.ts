import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userRoutes } from '../api/api-router';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  constructor(private http: _HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(environment.api.baseUrl + userRoutes.getAll+ 0);
  }
  getById(id: any): Observable<any> {
    return this.http.get(environment.api.baseUrl + userRoutes.getUserById+ id);
  }
  create(model: any): Observable<any> {
    return this.http.post(environment.api.baseUrl + userRoutes.create, model)
  }
  update(model: any): Observable<any> {
    return this.http.put(environment.api.baseUrl + userRoutes.update, model)
  }
  delete(id: any): Observable<any> {
    return this.http.delete(environment.api.baseUrl + userRoutes.delete + id)
  }
  // getById(id: any): Observable<any> {
  //   return this.http.get(environment.api.baseUrl + DotTuyenSinhRoutes.getbyid+id)
  // }
  // capNhatTrangThai(model: any):  Observable<any> {
  //   return this.http.put(environment.api.baseUrl + DotTuyenSinhRoutes.capNhatTrangThai, model);
  // }
  // getDetail(maDot: any):Observable<any>{
  //   return this.http.get(environment.api.baseUrl + dotTuyenSinhRouter.getDetail + maDot);
  // }
}
