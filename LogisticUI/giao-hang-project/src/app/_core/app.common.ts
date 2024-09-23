import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ResponseLogin } from './model/output/ResponseLogin';

export class common {
    public loginResult!: any;
    public PortalResult: any;
    public cookieService!: CookieService;

    public CheckLogin() {
        this.loginResult = this.getUserinfo();
        if (this.loginResult == null) {
            this.router.navigate(['/login']);
        }
    }
    public getCustomerObj() {
        return JSON.parse(localStorage.getItem('CustomerObj') || 'null');
    }
    constructor(private router: Router) { }

    public getUserinfo() {
        this.loginResult = JSON.parse(localStorage.getItem('UserInfo') || '{}');
        return this.loginResult;
    }

    login() {
        this.router.navigate(['/']);
    }
    
    logout() {
        localStorage.removeItem('UserInfo');
        localStorage.removeItem('CustomerObj');
        this.router.navigate(['/login']);
    }
    logoutPortal() {
        localStorage.removeItem('CustomerObj');
    }
}
