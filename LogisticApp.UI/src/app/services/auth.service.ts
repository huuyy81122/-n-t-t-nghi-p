import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  login$ = this.loginSubject.asObservable();

  constructor() { }

  private isLoggedIn(): boolean {
    return localStorage.getItem('LOGIN') === 'true';
  }

  setLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('LOGIN', isLoggedIn.toString());
    this.loginSubject.next(isLoggedIn);
  }
}
