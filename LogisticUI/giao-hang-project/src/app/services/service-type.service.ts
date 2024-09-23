import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from '../../configuration';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ServiceTypeServices {
  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private router: Router,
    private http: HttpClient
  ) {}
controllerName : string = "ServiceType";

  getList(token: any): Observable<any> {
    return this.http
      .get<any>(this.appConfig.API + this.controllerName, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  save(token: any, m: any): Observable<any> {
    return this.http
      .post<any>(this.appConfig.API + this.controllerName, m, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        map((z) => {
          return z;
        })
      );
  }

  delete(token: any, id: any): Observable<any> {
    return this.http
      .delete<any>(this.appConfig.API + this.controllerName+'?ID=' + id, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        map((z) => {
          return z;
        })
      );
  }
}
