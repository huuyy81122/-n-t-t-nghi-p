// jwt.service.ts
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jsonwebtoken';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
