import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

  getToken(): string {
    return localStorage.getItem('currentUser');
  }

  decodeToken(): any {
    const token = this.getToken();
    if (token) {
      return jwt_decode.jwtDecode(token);
    }
    return null;
  }
}