import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private userTypeSubject = new BehaviorSubject<string>(this.getUserType());
  private currentUserSubject = new BehaviorSubject<string>(this.getCurrentUser());

  userType$ = this.userTypeSubject.asObservable();
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    window.addEventListener('storage', (event) => {
      if (event.key === 'user_type') {
        this.userTypeSubject.next(event.newValue || '');
      }
      if (event.key === 'currentUser') {
        this.currentUserSubject.next(event.newValue || '');
      }
    });
  }

  setUserType(userType: string): void {
    localStorage.setItem('user_type', userType);
    this.userTypeSubject.next(userType);
  }

  getUserType(): string | null {
    return localStorage.getItem('user_type');
  }

  setCurrentUser(currentUser: string): void {
    localStorage.setItem('currentUser', currentUser);
    this.currentUserSubject.next(currentUser);
  }

  getCurrentUser(): string | null {
    return localStorage.getItem('currentUser');
  }
}
