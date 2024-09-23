import { AppConfiguration } from './../configuration';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppConfig } from '../configuration';

@Injectable({
  providedIn: 'root',
})
export class AccService {
  constructor(
    @Inject(AppConfig) private readonly appConfig: AppConfiguration,
    private router: Router,
    private http: HttpClient
  ) { }

  login(req: any) {
    return this.http
      .post<any>(this.appConfig.API + '/Account/Login', req)
      .pipe(
        map((z: any) => {
          return z;
        })
      );
  }
  changePass(CurrentPass: any, Password: any, ConfirmPass: any, token: any, id: any) {
    return this.http
      .get<any>(this.appConfig.API + '/Account/Login?CurrentPass=' + CurrentPass + '&Pass=' + Password + '&ConfirmPass=' + ConfirmPass + '&id=' + id, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      })
      .pipe(
        map((z: any) => {
          return z;
        })
      );
  }
}
