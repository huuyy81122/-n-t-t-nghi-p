import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConfig, AppConfiguration } from '../../../configuration';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class TestService {
    constructor(
        @Inject(AppConfig) private readonly appConfig: AppConfiguration,
        private router: Router,
        private http: HttpClient
    ) { }

    getList(token: any): Observable<any> {
        return this.http.get<any>(' http://localhost:3000/posts', {
            headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
        }).pipe(map((z) => { return z; }));
    }
}
