import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from '../../../configuration';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private router: Router,
    private http: HttpClient
  ) {}

  getList(ID_nguon: any, Loai_dinh_kem: any,token: any): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + '/File?ID_nguon='+ID_nguon+"&Loai_dinh_kem="+Loai_dinh_kem, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
  Insert(token: any, m: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + '/File', m, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
  Delete(token: any, id: any): Observable<any> {
    return this.http
      .delete<any>(this.appConfig.API + '/File?id=' + id, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
}
